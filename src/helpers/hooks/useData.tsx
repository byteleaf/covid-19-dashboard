import { useEffect, useState } from 'react';
import csv from 'csvtojson';
import axios from 'axios';
import { cloneDeep, takeRight } from 'lodash';
import { Country, CountryData, CountryName } from '../types/types';

type UseDataProps = {
  offset?: number; // Only fetch the last X days
  selectedCountries: string[];
};

type GetDataProps = {
  offset: number; // Only fetch the last X days
  selectedCountries: string[];
};

type FetchedData = {
  confirmed: { [key: string]: string }[];
  deaths: { [key: string]: string }[];
  recovered: { [key: string]: string }[];
};

const fetchData = async (selectedCountries: string[]): Promise<FetchedData> => {
  const urls = [
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
  ];

  // Fetch infection csv from GitHub
  const responses = await Promise.all(urls.map(url => axios.get(url)));

  // Parse CSV to JSON
  const allData = await Promise.all(responses.map(response => csv().fromString(response.data)));

  // Filter data of the selected countries
  const selectedCountryData = allData.map(allD =>
    allD.filter(country => selectedCountries.includes(country['Country/Region'])),
  );

  // Combine Data and return
  return {
    confirmed: selectedCountryData[0],
    deaths: selectedCountryData[1],
    recovered: selectedCountryData[2],
  };
};

const mapData = async (data: FetchedData, offset: number): Promise<Country[]> => {
  const combinedStateAndCountryData = data.confirmed.map((country, index) => {
    const countryData = cloneDeep(country);

    const countryName = countryData['Country/Region'];
    const stateName = countryData['Province/State'];

    // Remove unnecessary keys
    delete countryData.Lat;
    delete countryData.Long;
    delete countryData['Province/State'];
    delete countryData['Country/Region'];

    // Map data to a useful Structure
    const mappedData: CountryData = Object.keys(countryData).map(key => ({
      date: new Date(key),
      infections: +countryData[key],
      deaths: +data.deaths[index][key],
      recovered: +data.recovered[index][key],
      active: +countryData[key] - +data.deaths[index][key] - +data.recovered[index][key],
    }));

    return {
      name: countryName as CountryName,
      state: stateName, // Can be null if row is a country
      data: offset > 0 ? takeRight(mappedData, offset) : mappedData, // Only take the last X days
    };
  });

  const mappedData: Country[] = [];

  // Iterate over all Countries/States to sum up double entries (happens for states)
  combinedStateAndCountryData.forEach(row => {
    const newRow = cloneDeep(row);

    // If row is not yet existent in mappedData, it is a country or a new state (not yet added)
    if (!mappedData.find(country => country.name === newRow.name)) {
      delete newRow.state;

      mappedData.push(newRow);
    } else {
      // Else it definetely is a state where the country already exists in the Array, so the data has to be summed up.
      const country = mappedData.find(c => c.name === newRow.name) as Country;

      // Sum up all state data and set as data of the country
      country.data = country.data.map((datePoint, index) => ({
        name: newRow.name,
        date: datePoint.date,
        infections: datePoint.infections + newRow.data[index].infections,
        deaths: datePoint.deaths + newRow.data[index].deaths,
        recovered: datePoint.recovered + newRow.data[index].recovered,
        active: datePoint.active + newRow.data[index].active,
      }));
    }
  });

  return mappedData;
};

const getData = async ({ offset, selectedCountries }: GetDataProps) => {
  const data = await fetchData(selectedCountries);
  return mapData(data, offset);
};

const useData = ({ offset = 0, selectedCountries }: UseDataProps) => {
  const [data, setData] = useState<Country[] | null>(null);
  const [oldSelectedCountries, setOldSelectedCountries] = useState<string[]>([]);
  const [oldOffset, setOldOffset] = useState<number>(0);

  useEffect(() => {
    if (oldSelectedCountries.length !== selectedCountries.length || offset !== oldOffset) {
      setOldSelectedCountries(selectedCountries);
      setOldOffset(offset);
      getData({ offset: offset ?? 0, selectedCountries }).then(setData);
    }
  }, [oldSelectedCountries, oldOffset, selectedCountries, offset, setData]);

  return {
    loading: !data,
    data,
  };
};

export default useData;

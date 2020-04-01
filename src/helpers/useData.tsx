import { useEffect, useState } from 'react';
import csv from 'csvtojson';
import axios from 'axios';
import { cloneDeep, drop } from 'lodash';
import { Country, CountryData } from './types';

type UseDataProps = {
  offset?: number; // Only fetch the last X days
};

type SelectedCountries = {
  countries: string[];
  states: string[];
};

type FetchedData = { [key: string]: string }[];

const selectedCountries: SelectedCountries = {
  countries: ['Germany', 'Italy', 'US', 'France', 'Spain', 'China'], // We don't want the Provinces of France to be in the Dataset
  states: ['China'], // Some countries are divided into states. Here we want to sum up all state data.
};

const fetchData = async (): Promise<FetchedData> => {
  // Fetch csv from GitHub
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
  );

  // Parse CSV to JSON
  const allData = await csv().fromString(data);

  // Filter data of the selected countries
  const selectedCountryData = allData.filter(country =>
    selectedCountries.countries.includes(country['Country/Region']),
  );

  // Filtered data of the selected states
  const summedUpStateData = allData.filter(country => selectedCountries.states.includes(country['Country/Region']));

  // Combine Data and return
  return [...selectedCountryData, ...summedUpStateData];
};

const mapData = async (data: FetchedData, offset: number): Promise<Country[]> => {
  const combinedStateAndCountryData = data.map(country => {
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
    }));

    return {
      name: countryName,
      state: stateName, // Can be null if row is a country
      data: drop(mappedData, offset), // Only take the last X days
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
      country.data = country.data.map((datePoint, i) => ({
        name: newRow.name,
        date: datePoint.date,
        infections: datePoint.infections + newRow.data[i].infections,
      }));
    }
  });

  return mappedData;
};

const getData = async ({ offset }: { offset: number }) => {
  const data = await fetchData();
  return mapData(data, offset);
};

const useData = ({ offset }: UseDataProps) => {
  const [data, setData] = useState<Country[] | null>(null);

  useEffect(() => {
    getData({ offset: offset ?? 0 }).then(setData);
  }, [setData]);

  return {
    loading: !data,
    data,
  };
};

export default useData;

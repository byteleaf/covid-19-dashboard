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

type FetchedData = {
  confirmed: { [key: string]: string }[];
  deaths: { [key: string]: string }[];
  recovered: { [key: string]: string }[];
};

const selectedCountries: SelectedCountries = {
  countries: ['Germany', 'Italy', 'US', 'France', 'Spain', 'China'], // We don't want the Provinces of France to be in the Dataset
  states: ['China'], // Some countries are divided into states. Here we want to sum up all state data.
};

const fetchData = async (): Promise<FetchedData> => {
  // Fetch infection csv from GitHub
  const confirmedRes = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
  );
  const deathsRes = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
  );
  const recoveredRes = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
  );

  // Parse CSV to JSON
  const allConfirmedData = await csv().fromString(confirmedRes.data);
  const allDeathsData = await csv().fromString(deathsRes.data);
  const allRecoveredData = await csv().fromString(recoveredRes.data);

  // Filter data of the selected countries
  const selectedConfirmedCountryData = allConfirmedData.filter(country =>
    selectedCountries.countries.includes(country['Country/Region']),
  );
  const selectedDeathsCountryData = allDeathsData.filter(country =>
    selectedCountries.countries.includes(country['Country/Region']),
  );
  const selectedRecoveredCountryData = allRecoveredData.filter(country =>
    selectedCountries.countries.includes(country['Country/Region']),
  );

  // Filtered data of the selected states
  const summedUpConfirmedStateData = allConfirmedData.filter(country =>
    selectedCountries.states.includes(country['Country/Region']),
  );
  const summedUpDeathsStateData = allDeathsData.filter(country =>
    selectedCountries.states.includes(country['Country/Region']),
  );
  const summedUpRecoveredStateData = allRecoveredData.filter(country =>
    selectedCountries.states.includes(country['Country/Region']),
  );

  // Combine Data and return
  return {
    confirmed: [...selectedConfirmedCountryData, ...summedUpConfirmedStateData],
    deaths: [...selectedDeathsCountryData, ...summedUpDeathsStateData],
    recovered: [...selectedRecoveredCountryData, ...summedUpRecoveredStateData],
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
      country.data = country.data.map((datePoint, index) => ({
        name: newRow.name,
        date: datePoint.date,
        infections: datePoint.infections + newRow.data[index].infections,
        deaths: datePoint.deaths + newRow.data[index].deaths,
        recovered: datePoint.recovered + newRow.data[index].recovered,
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

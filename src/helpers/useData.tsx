import { useEffect, useState } from 'react';
import csv from 'csvtojson';
import axios from 'axios';
import { cloneDeep, drop } from 'lodash';
import { Country } from './types';

type UseDataProps = {
  offset?: number; // Only fetch the last X days
};

const countries = ['Germany', 'Italy', 'US', 'France', 'Spain'];

const fetchData = async (selectedCounties?: string[]) => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
  );

  const allData = await csv().fromString(data);

  if (selectedCounties) {
    return allData.filter(country => countries.includes(country['Country/Region']) && country['Province/State'] === '');
  }

  return allData;
};

const mapData = async (data: { [key: string]: string }[], offset: number): Promise<Country[]> =>
  data.map(country => {
    const countryData = cloneDeep(country);
    const countryName = countryData['Country/Region'];

    delete countryData.Lat;
    delete countryData.Long;
    delete countryData['Province/State'];
    delete countryData['Country/Region'];

    const mappedCountryData = Object.keys(countryData).map(key => ({
      date: new Date(key),
      infections: +countryData[key],
    }));

    return {
      name: countryName,
      data: drop(mappedCountryData, offset),
    };
  });

const getData = async ({ offset }: { offset: number }) => {
  const data = await fetchData(countries);
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

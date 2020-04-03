import { CountryName } from './CountryName';

export type CountryDataPoint = {
  day?: number; // Relative day in chart
  date: Date;
  infections: number;
  deaths: number;
  recovered: number;
  active: number;
};

export type CountryData = CountryDataPoint[];

export type Country = {
  name: CountryName;
  data: CountryData;
};

import Countries from '../const/Countries';

export type CountryDataPoint = {
  day?: number; // Relative day in chart
  date: Date;
  infections: number;
  deaths: number;
  recovered: number;
  active: number;
};

export type CountryData = CountryDataPoint[];

export type CountryName = typeof Countries[number];

export type Country = {
  name: CountryName;
  data: CountryData;
};

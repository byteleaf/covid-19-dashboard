export type CountryDataPoint = {
  date: Date;
  infections: number;
  deaths: number;
  recovered: number;
  active: number;
};

export type CountryData = CountryDataPoint[];

export type Country = {
  name: string;
  data: CountryData;
};

export type CountryDataPoint = {
  date: Date;
  infections: number;
};

export type CountryData = CountryDataPoint[];

export type Country = {
  name: string;
  data: CountryData;
};

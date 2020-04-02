export type CountryDataPoint = {
  day?: number; // Relative day in chart
  date: Date;
  infections: number;
  deaths: number;
  recovered: number;
  active: number;
};

export type CountryData = CountryDataPoint[];

export type CountryName = 'China' | 'France' | 'Germany' | 'Italy' | 'Spain' | 'US' | 'United Kingdom';

export type Country = {
  name: CountryName;
  data: CountryData;
};

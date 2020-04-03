import React from 'react';
import AreaChart from '../../components/charts/AreaChart';
import { Country } from '../../helpers/types/types';

type AllInOneProps = {
  loading: boolean;
  countryData: Country[] | null;
  isLogScale: boolean;
};

const AllInOne: React.FC<AllInOneProps> = ({ loading, countryData, isLogScale }) => {
  return (
    <div className="flex flex-wrap">
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'Germany') as Country}
        title="Covid-19 in Germany"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'Italy') as Country}
        title="Covid-19 in Italy"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'China') as Country}
        title="Covid-19 in China"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'US') as Country}
        title="Covid-19 in the US"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'United Kingdom') as Country}
        title="Covid-19 in the United Kingdom"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'Spain') as Country}
        title="Covid-19 in Spain"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
      <AreaChart
        loading={loading}
        data={countryData?.find(country => country.name === 'France') as Country}
        title="Covid-19 in France"
        subtitle="Active Cases, Deaths and Recovered"
        logScale={isLogScale}
      />
    </div>
  );
};

export default AllInOne;

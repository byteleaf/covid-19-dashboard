import React from 'react';
import LineChart from '../components/LineChart';
import useData from '../helpers/useData';
import AreaChart from '../components/AreaChart';
import { Country } from '../helpers/types';

const Index = () => {
  const { loading, data } = useData({
    offset: 30,
  });

  return (
    <div className="flex flex-wrap">
      <div className="w-1/2">
        <LineChart
          loading={loading}
          data={data}
          dataKey="infections"
          title="Covid-19 Infections"
          subtitle="Infections in selected Countries"
          yAxisTitle="Infections"
        />
      </div>
      <div className="w-1/2">
        <LineChart
          loading={loading}
          data={data}
          dataKey="deaths"
          title="Covid-19 Deaths"
          subtitle="Deaths in selected Countries"
          yAxisTitle="Deaths"
        />
      </div>
      <div className="w-1/2">
        <LineChart
          loading={loading}
          data={data}
          dataKey="recovered"
          title="Covid-19 Recovered People"
          subtitle="Recovered People in selected Countries"
          yAxisTitle="Recovered People"
        />
      </div>
      <div className="w-1/2">
        <LineChart
          loading={loading}
          data={data}
          dataKey="active"
          title="Covid-19 Active Infections"
          subtitle="Active Infections in selected Countries"
          yAxisTitle="Active Infections"
        />
      </div>
      <div className="w-1/2">
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'Germany') as Country}
          title="Covid-19 in Germany"
          subtitle="Active Cases, Deaths and Recovered"
          yAxisTitle=""
        />
      </div>
      <div className="w-1/2">
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'Italy') as Country}
          title="Covid-19 in Italy"
          subtitle="Active Cases, Deaths and Recovered"
          yAxisTitle=""
        />
      </div>
      <div className="w-1/2">
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'China') as Country}
          title="Covid-19 in China"
          subtitle="Active Cases, Deaths and Recovered"
          yAxisTitle=""
        />
      </div>
      <div className="w-1/2">
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'US') as Country}
          title="Covid-19 in the US"
          subtitle="Active Cases, Deaths and Recovered"
          yAxisTitle=""
        />
      </div>
    </div>
  );
};

export default Index;

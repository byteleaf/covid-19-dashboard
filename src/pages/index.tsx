import React from 'react';
import LineChart from '../components/LineChart';
import useData from '../helpers/useData';

const Index = () => {
  const { loading, data } = useData({
    offset: 30,
  });

  return (
    <div>
      <LineChart
        loading={loading}
        data={data}
        dataKey="infections"
        title="Covid-19 Infections"
        subtitle="Infections in selected Countries"
        yAxisTitle="Infections"
      />
      <LineChart
        loading={loading}
        data={data}
        dataKey="deaths"
        title="Covid-19 Deaths"
        subtitle="Deaths in selected Countries"
        yAxisTitle="Deaths"
      />
      <LineChart
        loading={loading}
        data={data}
        dataKey="recovered"
        title="Covid-19 Recovered People"
        subtitle="Recovered People in selected Countries"
        yAxisTitle="Recovered People"
      />
    </div>
  );
};

export default Index;

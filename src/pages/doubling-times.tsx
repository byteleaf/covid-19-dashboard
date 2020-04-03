import React from 'react';
import DoublingTimeChart from '../components/charts/DoublingTimeChart';
import useData from '../helpers/useData';
import Layout from '../components/layout/Layout';

const DoublingTimes = () => {
  const { loading, data } = useData({
    offset: 0,
  });

  return (
    <Layout>
      <div className="flex flex-col">
        <DoublingTimeChart
          loading={loading}
          data={data}
          dataKey="infections"
          startValue={100}
          title="Covid-19 Infection Doubling Time"
          xAxisTitle="Days since the 100th Infection"
          yAxisTitle="Infections"
        />
        <DoublingTimeChart
          loading={loading}
          data={data}
          dataKey="deaths"
          startValue={10}
          title="Covid-19 Deaths Doubling Time"
          xAxisTitle="Days since the 10th Death"
          yAxisTitle="Death"
        />
      </div>
    </Layout>
  );
};

export default DoublingTimes;

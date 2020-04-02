import React from 'react';
import DoublingTimeChart from '../components/DoublingTimeChart';
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
          startValue={1000}
          title="Covid-19 Infection Doubling Time"
          xAxisTitle="Days since the 100th Infection"
          yAxisTitle="Infections"
        />
      </div>
    </Layout>
  );
};

export default DoublingTimes;

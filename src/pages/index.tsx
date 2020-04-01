import React, { useState } from 'react';
import LineChart from '../components/LineChart';
import useData from '../helpers/useData';
import Layout from '../components/layout/Layout';

const Index = () => {
  const [isLogScale, setIsLogScale] = useState(false);

  const { loading, data } = useData({
    offset: 21,
  });

  return (
    <Layout>
      <div className="flex justify-center py-8">
        {!loading && (
          <div className="border border-solid border-black">
            <button
              className={`p-2 focus:outline-none hover:bg-light-turquois ${isLogScale ? '' : 'bg-turquois text-white'}`}
              type="button"
              onClick={() => setIsLogScale(false)}
            >
              Linear Scale
            </button>
            <button
              className={`p-2 border-l border-solid border-black focus:outline-none hover:bg-light-turquois ${
                isLogScale ? 'bg-turquois text-white' : ''
              }`}
              type="button"
              onClick={() => setIsLogScale(true)}
            >
              Log Scale
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        <LineChart
          loading={loading}
          data={data}
          dataKey="infections"
          title="Covid-19 Infections"
          subtitle="Infections in selected Countries"
          yAxisTitle="Infections"
          logScale={isLogScale}
        />
        <LineChart
          loading={loading}
          data={data}
          dataKey="deaths"
          title="Covid-19 Deaths"
          subtitle="Deaths in selected Countries"
          yAxisTitle="Deaths"
          logScale={isLogScale}
        />
        <LineChart
          loading={loading}
          data={data}
          dataKey="recovered"
          title="Covid-19 Recovered People"
          subtitle="Recovered People in selected Countries"
          yAxisTitle="Recovered People"
          logScale={isLogScale}
        />
        <LineChart
          loading={loading}
          data={data}
          dataKey="active"
          title="Covid-19 Active Infections"
          subtitle="Active Infections in selected Countries"
          yAxisTitle="Active Infections"
          logScale={isLogScale}
        />
      </div>
    </Layout>
  );
};

export default Index;

import React, { useState } from 'react';
import useData from '../helpers/useData';
import AreaChart from '../components/charts/AreaChart';
import { Country } from '../helpers/types/types';
import Layout from '../components/layout/Layout';
import LogScaleSwitch from '../components/switches/LogScaleSwitch';

const AllInOne = () => {
  const [isLogScale, setIsLogScale] = useState(false);

  const { loading, data } = useData({
    offset: 21,
  });

  return (
    <Layout>
      <div className="flex justify-center pt-8">
        {!loading && (
          <LogScaleSwitch isLogScale={isLogScale} setIsLogScale={(setTo: boolean) => setIsLogScale(setTo)} />
        )}
      </div>
      <div className="flex flex-wrap">
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'Germany') as Country}
          title="Covid-19 in Germany"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'Italy') as Country}
          title="Covid-19 in Italy"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'China') as Country}
          title="Covid-19 in China"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'US') as Country}
          title="Covid-19 in the US"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'United Kingdom') as Country}
          title="Covid-19 in the United Kingdom"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'Spain') as Country}
          title="Covid-19 in Spain"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
        <AreaChart
          loading={loading}
          data={data?.find(country => country.name === 'France') as Country}
          title="Covid-19 in France"
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
      </div>
    </Layout>
  );
};

export default AllInOne;

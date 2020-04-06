import React from 'react';
import LineChart from '../../components/charts/LineChart';
import { Country } from '../../helpers/types/types';

type DashboardProps = {
  loading: boolean;
  countryData: Country[] | null;
  isLogScale: boolean;
};

const Dashboard: React.FC<DashboardProps> = ({ loading, countryData, isLogScale }) => {
  return (
    <div className="flex flex-wrap">
      <LineChart
        loading={loading}
        data={countryData}
        dataKey="infections"
        title="Covid-19 Infections"
        subtitle="Infections in selected Countries"
        yAxisTitle="Infections"
        logScale={isLogScale}
      />
      <LineChart
        loading={loading}
        data={countryData}
        dataKey="deaths"
        title="Covid-19 Deaths"
        subtitle="Deaths in selected Countries"
        yAxisTitle="Deaths"
        logScale={isLogScale}
      />
      <LineChart
        loading={loading}
        data={countryData}
        dataKey="recovered"
        title="Covid-19 Recovered People"
        subtitle="Recovered People in selected Countries"
        yAxisTitle="Recovered People"
        logScale={isLogScale}
      />
      <LineChart
        loading={loading}
        data={countryData}
        dataKey="active"
        title="Covid-19 Active Infections"
        subtitle="Active Infections in selected Countries"
        yAxisTitle="Active Infections"
        logScale={isLogScale}
      />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import DoublingTimeChart from '../../components/charts/DoublingTimeChart';
import { Country } from '../../helpers/types/types';

type DoublingTimesProps = {
  loading: boolean;
  countryData: Country[] | null;
};

const DoublingTimes: React.FC<DoublingTimesProps> = ({ loading, countryData }) => {
  return (
    <div className="flex flex-col">
      <DoublingTimeChart
        loading={loading}
        data={countryData}
        dataKey="infections"
        startValue={100}
        title="Covid-19 Infection Doubling Time"
        xAxisTitle="Days since the 100th Infection"
        yAxisTitle="Infections"
      />
      <DoublingTimeChart
        loading={loading}
        data={countryData}
        dataKey="deaths"
        startValue={10}
        title="Covid-19 Deaths Doubling Time"
        xAxisTitle="Days since the 10th Death"
        yAxisTitle="Death"
      />
    </div>
  );
};

export default DoublingTimes;

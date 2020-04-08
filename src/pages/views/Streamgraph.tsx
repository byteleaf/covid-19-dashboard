import React from 'react';
import { Country } from '../../helpers/types/types';
import StreamgraphChart from '../../components/charts/StreamgraphCharts';

type DoublingTimesProps = {
  loading: boolean;
  countryData: Country[] | null;
};

const DoublingTimes: React.FC<DoublingTimesProps> = ({ loading, countryData }) => {
  return (
    <div className="flex flex-col">
      <StreamgraphChart
        loading={loading}
        data={countryData}
        dataKey="active"
        title="Covid-19 Active Infections per Country"
      />
    </div>
  );
};

export default DoublingTimes;

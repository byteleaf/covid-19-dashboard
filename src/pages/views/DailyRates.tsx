import React from 'react';
import { Country } from '../../helpers/types/types';
import BarChart from '../../components/charts/BarChart';

type DailyRatesProps = {
  loading: boolean;
  countryData: Country[] | null;
};

const DailyRates: React.FC<DailyRatesProps> = ({ loading, countryData }) => {
  return (
    <div className="flex flex-wrap">
      {countryData?.map((singleCountryData, i) => (
        <BarChart
          key={i} // We explicitly want to use the index (smooth rerender effect from Highcharts)
          loading={loading}
          data={singleCountryData}
          title={singleCountryData.name}
          subtitle="Daily new Cases, Deaths and Recovered"
        />
      ))}
    </div>
  );
};

export default DailyRates;

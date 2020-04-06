import React from 'react';
import { Country } from '../../helpers/types/types';
import BarChart from '../../components/charts/BarChart';

type DailyRatesProps = {
  loading: boolean;
  countryData: Country[] | null;
  isLogScale: boolean;
};

const DailyRates: React.FC<DailyRatesProps> = ({ loading, countryData, isLogScale }) => {
  return (
    <div className="flex flex-wrap">
      {countryData?.map((singleCountryData, i) => (
        <BarChart
          key={i} // We explicitly want to use the index (smooth rerender effect from Highcharts)
          loading={loading}
          data={singleCountryData}
          title={singleCountryData.name}
          subtitle="Daily new Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
      ))}
    </div>
  );
};

export default DailyRates;

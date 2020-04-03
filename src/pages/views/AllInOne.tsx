import React from 'react';
import AreaChart from '../../components/charts/AreaChart';
import { Country } from '../../helpers/types/types';

type AllInOneProps = {
  loading: boolean;
  countryData: Country[] | null;
  isLogScale: boolean;
};

const AllInOne: React.FC<AllInOneProps> = ({ loading, countryData, isLogScale }) => {
  return (
    <div className="flex flex-wrap">
      {countryData?.map((singleCountryData, i) => (
        <AreaChart
          key={i} // We explicitly want to use the index (smooth rerender effect from Highcharts)
          loading={loading}
          data={singleCountryData}
          title={singleCountryData.name}
          subtitle="Active Cases, Deaths and Recovered"
          logScale={isLogScale}
        />
      ))}
    </div>
  );
};

export default AllInOne;

import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Country } from '../../helpers/types/types';
import { ScreenHeightContext } from '../../helpers/screenHeightContext';
import { StateColors, TooltipColors } from '../../helpers/Colors';
import returnTimeInMs from '../../helpers/returnTimeInMs';

type AreaChartProps = {
  loading: boolean;
  data: Country | null;
  title: string;
  subtitle: string;
  logScale: boolean;
};

const AreaChart: React.FC<AreaChartProps> = ({ loading, data, title, subtitle, logScale }) => {
  const screenHeight = useContext(ScreenHeightContext);

  const options = {
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      type: logScale ? 'logarithmic' : 'linear',
    },
    chart: {
      type: 'area',
      height: screenHeight ? screenHeight * 0.6 : 600,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      marker: {
        enabled: false,
      },
      backgroundColor: TooltipColors.Background,
      borderColor: TooltipColors.Border,
      borderRadius: 0,
      borderWidth: 1,
      shadow: false,
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineWidth: 0,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        name: 'Active',
        data: data?.data.map(day => [returnTimeInMs(day.date), day.active]),
        color: StateColors.Active,
      },
      {
        name: 'Recovered',
        data: data?.data.map(day => [returnTimeInMs(day.date), day.recovered]),
        color: StateColors.Recovered,
      },
      {
        name: 'Deaths',
        data: data?.data.map(day => [returnTimeInMs(day.date), day.deaths]),
        color: StateColors.Deaths,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-1/2 px-2 py-8">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AreaChart;

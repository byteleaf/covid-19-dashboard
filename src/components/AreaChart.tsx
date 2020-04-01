import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Country } from '../helpers/types';

type AreaChartProps = {
  loading: boolean;
  data: Country | null;
  title: string;
  subtitle: string;
  yAxisTitle: string;
  logScale: boolean;
};

const AreaChart = ({ loading, data, title, subtitle, yAxisTitle, logScale }: AreaChartProps) => {
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
      title: {
        text: yAxisTitle,
      },
    },
    chart: {
      type: 'area',
    },
    tooltip: {
      split: true,
      crosshairs: true,
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Active',
        data: data?.data.map(day => [day.date.getTime(), day.active]),
      },
      {
        name: 'Deaths',
        data: data?.data.map(day => [day.date.getTime(), day.deaths]),
      },
      {
        name: 'Recovered',
        data: data?.data.map(day => [day.date.getTime(), day.recovered]),
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AreaChart;

import React, { useEffect, useState } from 'react';
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
  const [height, setHeight] = useState<number | null>(null);
  if (process.browser) {
    useEffect(() => setHeight(document.children[0].clientHeight), [document.children[0].clientHeight]);
  }

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
      height: height ? height * 0.6 : 600,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      marker: {
        enabled: false,
      },
      backgroundColor: '#FFFFFF',
      borderColor: '#0AB4B4',
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
        data: data?.data.map(day => [day.date.getTime(), day.active]),
        color: '#ff8080',
      },
      {
        name: 'Deaths',
        data: data?.data.map(day => [day.date.getTime(), day.deaths]),
        color: '#000000',
      },
      {
        name: 'Recovered',
        data: data?.data.map(day => [day.date.getTime(), day.recovered]),
        color: '#00AA00',
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-1/2 pb-12">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AreaChart;

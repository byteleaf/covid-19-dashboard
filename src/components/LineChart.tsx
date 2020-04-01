import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Country } from '../helpers/types';

type LineChartProps = {
  loading: boolean;
  data: Country[] | null;
  dataKey: 'infections' | 'deaths' | 'recovered' | 'active';
  title: string;
  subtitle: string;
  yAxisTitle: string;
  logScale: boolean;
};

const LineChart = ({ loading, data, dataKey, title, subtitle, yAxisTitle, logScale }: LineChartProps) => {
  const options = {
    chart: {
      height: 500,
    },
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
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
        },
      },
    },
    series: data?.map(country => ({
      name: country.name,
      data: country.data.map(day => [day.date.getTime(), day[dataKey]]),
    })),
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
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

export default LineChart;

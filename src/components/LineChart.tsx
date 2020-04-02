import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Country } from '../helpers/types';
import Colors from '../helpers/Colors';

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
      type: 'line',
      zoomType: 'x',
      height: 700,
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
      backgroundColor: '#FFFFFF',
      borderColor: '#0AB4B4',
      borderRadius: 0,
      borderWidth: 1,
      shadow: false,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
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
    series: data?.map(country => ({
      name: country.name,
      data: country.data.map(day => [day.date.getTime(), day[dataKey]]),
      color: Colors[country.name],
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

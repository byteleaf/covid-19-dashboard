import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { take } from 'lodash';
import { Country, CountryDataPoint } from '../helpers/types';
import Colors from '../helpers/Colors';

type LineChartProps = {
  loading: boolean;
  data: Country[] | null;
  dataKey: 'infections' | 'deaths' | 'recovered' | 'active';
  startValue: number; // Cut all values that are below this threshold
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
};

type LineData = {
  name: string;
  data: [number, number][];
  dashStyle: string;
  color: string;
};

const firstXDays = 60;

const DoublingTimeChart = ({ loading, data, dataKey, startValue, title, xAxisTitle, yAxisTitle }: LineChartProps) => {
  const mappedData = data?.map(
    (country): Country => ({
      name: country.name,
      data: take(
        country.data
          .filter(row => row[dataKey] > startValue)
          .map(
            (row, index): CountryDataPoint => ({
              ...row,
              day: index + 1,
            }),
          ),
        firstXDays,
      ),
    }),
  );

  const createDoublingLine = (doublingTimeInDays: number): LineData => ({
    name: `Doubles every ${doublingTimeInDays} days`,
    data: [...Array(firstXDays / (4 / doublingTimeInDays))].map((_, i) => {
      const day = i + 1;
      const currentValue = startValue * (2 ** (1 / doublingTimeInDays)) ** i;

      return [day, currentValue];
    }),
    dashStyle: 'Dot',
    color: '#999999',
  });

  const doublingLines: LineData[] = [
    createDoublingLine(2),
    createDoublingLine(3),
    createDoublingLine(4),
    createDoublingLine(5),
  ];

  const lineData: LineData[] =
    mappedData?.map(country => ({
      name: country.name,
      data: country.data.map(row => [row.day as number, row[dataKey]]),
      dashStyle: 'Solid',
      color: Colors[country.name],
    })) || [];

  const dataPlusLines: LineData[] = [...lineData, ...doublingLines];

  const options = {
    chart: {
      type: 'line',
      zoomType: 'x',
      width: 2400,
      height: 1200,
    },
    title: {
      text: title,
    },
    xAxis: {
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      type: 'logarithmic',
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
    series: dataPlusLines,
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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DoublingTimeChart;

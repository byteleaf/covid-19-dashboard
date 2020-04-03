import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { take } from 'lodash';
import { Country, CountryDataPoint } from '../../helpers/types/types';
import { HelperColors, TooltipColors } from '../../helpers/const/Colors';
import { ScreenHeightContext } from '../../helpers/hooks/screenHeightContext';

type DoublingTimeChartProps = {
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
  color?: string;
};

const firstXDays = 60;

const DoublingTimeChart: React.FC<DoublingTimeChartProps> = ({
  loading,
  data,
  dataKey,
  startValue,
  title,
  xAxisTitle,
  yAxisTitle,
}) => {
  const screenHeight = useContext(ScreenHeightContext);

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
    data: [...Array(firstXDays / (5 / doublingTimeInDays))].map((_, i) => {
      const day = i + 1;
      const currentValue = startValue * (2 ** (1 / doublingTimeInDays)) ** i;

      return [day, currentValue];
    }),
    dashStyle: 'Dot',
    color: HelperColors.DotLine,
  });

  const doublingLines: LineData[] = [...Array(4)].map((_, i) => createDoublingLine(i + 2));

  const lineData: LineData[] =
    mappedData?.map(country => ({
      name: country.name,
      data: country.data.map(row => [row.day as number, row[dataKey]]),
      dashStyle: 'Solid',
    })) || [];

  const dataPlusLines: LineData[] = [...lineData, ...doublingLines];

  const options = {
    chart: {
      type: 'line',
      zoomType: 'x',
      height: screenHeight ? screenHeight * 0.85 : 600,
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
      backgroundColor: TooltipColors.Background,
      borderColor: TooltipColors.Border,
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

  return (
    <div className="w-full px-2 py-8">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DoublingTimeChart;

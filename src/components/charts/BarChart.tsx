import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { drop } from 'lodash';
import { Country } from '../../helpers/types/types';
import { TooltipColors, StateColors } from '../../helpers/const/Colors';
import { ScreenHeightContext } from '../../helpers/hooks/screenHeightContext';
import returnTimeInMs from '../../helpers/functions/returnTimeInMs';

type BarChartProps = {
  loading: boolean;
  data: Country | null;
  title: string;
  subtitle: string;
  logScale: boolean;
};

const BarChart: React.FC<BarChartProps> = ({ loading, data, title, subtitle, logScale }) => {
  const screenHeight = useContext(ScreenHeightContext);

  const options = {
    chart: {
      type: 'column',
      zoomType: 'x',
      height: screenHeight ? screenHeight * 0.6 : 600,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      type: 'datetime',
      crosshair: true,
    },
    yAxis: {
      type: logScale ? 'logarithmic' : 'linear',
      min: 0,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    tooltip: {
      shared: true,
      backgroundColor: TooltipColors.Background,
      borderColor: TooltipColors.Border,
      borderRadius: 0,
      borderWidth: 1,
      shadow: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        groupPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Infections',
        data: drop(
          data?.data.map((day, i) => [returnTimeInMs(day.date), day.infections - (data.data[i - 1]?.infections || 0)]),
          1,
        ),
        color: StateColors.Active,
      },
      {
        name: 'Recovered',
        data: drop(
          data?.data.map((day, i) => [returnTimeInMs(day.date), day.recovered - (data.data[i - 1]?.recovered || 0)]),
          1,
        ),
        color: StateColors.Recovered,
      },
      {
        name: 'Deaths',
        data: drop(
          data?.data.map((day, i) => [returnTimeInMs(day.date), day.deaths - (data.data[i - 1]?.deaths || 0)]),
          1,
        ),
        color: StateColors.Deaths,
      },
    ],
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
    credits: {
      enabled: false,
    },
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

export default BarChart;

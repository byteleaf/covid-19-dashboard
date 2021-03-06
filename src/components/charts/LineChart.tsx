import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Country } from '../../helpers/types/types';
import { TooltipColors } from '../../helpers/const/Colors';
import { ScreenHeightContext } from '../../helpers/hooks/screenHeightContext';
import returnTimeInMs from '../../helpers/functions/returnTimeInMs';

type LineChartProps = {
  loading: boolean;
  data: Country[] | null;
  dataKey: 'infections' | 'deaths' | 'recovered' | 'active';
  title: string;
  subtitle: string;
  yAxisTitle: string;
  logScale: boolean;
};

const LineChart: React.FC<LineChartProps> = ({ loading, data, dataKey, title, subtitle, yAxisTitle, logScale }) => {
  const screenHeight = useContext(ScreenHeightContext);

  const options = {
    chart: {
      type: 'line',
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
    series: data?.map(country => ({
      name: country.name,
      data: country.data.map(day => [returnTimeInMs(day.date), day[dataKey]]),
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

export default LineChart;

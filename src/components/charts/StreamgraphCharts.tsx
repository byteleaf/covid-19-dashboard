import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import Streamgraph from 'highcharts/modules/streamgraph';
import { take } from 'lodash';
import { Country, CountryDataPoint } from '../../helpers/types/types';
import { HelperColors, TooltipColors } from '../../helpers/const/Colors';
import { ScreenHeightContext } from '../../helpers/hooks/screenHeightContext';
import returnTimeInMs from '../../helpers/functions/returnTimeInMs';

type StreamgraphProps = {
  loading: boolean;
  data: Country[] | null;
  dataKey: 'infections' | 'deaths' | 'recovered' | 'active';
  title: string;
  yAxisTitle: string;
};

const StreamgraphCharts: React.FC<StreamgraphProps> = ({ loading, data, dataKey, title, yAxisTitle }) => {
  HighchartsMore(Highcharts);
  Streamgraph(Highcharts);

  const screenHeight = useContext(ScreenHeightContext);

  const options = {
    chart: {
      type: 'streamgraph',
      zoomType: 'x',
      height: screenHeight ? screenHeight * 0.6 : 600,
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
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
    <div className="w-full px-2 py-8">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StreamgraphCharts;

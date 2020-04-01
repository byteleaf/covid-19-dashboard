import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useData from '../helpers/useData';

const Test = () => {
  const { loading, data } = useData({
    offset: 31,
  });

  const options = {
    title: {
      text: 'Covid-19 Infections',
    },

    subtitle: {
      text: 'Infections in selected Countries',
    },

    xAxis: {
      type: 'datetime',
    },

    yAxis: {
      title: {
        text: 'Infections',
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
      },
    },

    series: data?.map(country => ({
      name: country.name,
      data: country.data.map(day => [day.date.getTime(), day.infections]),
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
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Test;

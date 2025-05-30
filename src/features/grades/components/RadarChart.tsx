'use client';

import { Chart } from 'react-chartjs-2';

import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface RadarChartProps extends React.ComponentPropsWithoutRef<'div'> {
  labels: string[];
  data: number[];
}

const chartOptions: ChartOptions<'radar'> = {
  responsive: true,
  elements: {
    line: {
      borderWidth: 2,
      borderColor: 'rgba(75, 137, 220, 1)',
    },
    point: {
      backgroundColor: 'rgba(75, 137, 220, 1)',
      borderColor: 'rgba(75, 137, 220, 1)',
    },
  },
  backgroundColor: 'rgba(75, 137, 220, 0.38)',
  scales: {
    r: {
      ticks: {
        stepSize: 10,
        display: false,
      },
      grid: {
        color: 'rgba(226, 232, 240, 1)',
      },
      pointLabels: {
        font: {
          size: 14,
          weight: 600,
          family: 'Pretendard',
        },
        color: 'rgba(0, 0, 0, 0.38)',
      },
      suggestedMin: 0,
      suggestedMax: 100,
      type: 'radialLinear',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        family: 'Pretendard',
        weight: 600,
        size: 12,
      },
      bodyFont: {
        family: 'Pretendard',
        size: 12,
      },
      callbacks: {
        label: function (context) {
          return `${context.formattedValue}점`;
        },
      },
    },
  },
  animation: {
    duration: 2000,
  },
};

const RadarChart = ({ labels, data, ...props }: RadarChartProps) => {
  const chartData: ChartData<'radar'> = {
    labels: labels,
    datasets: [
      {
        label: '성적',
        data: data,
        fill: true,
      },
    ],
  };

  return (
    <div {...props} className={`${props.className ?? ''}`}>
      <Chart type="radar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default RadarChart;

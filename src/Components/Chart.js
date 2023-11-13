import styled from 'styled-components';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useMemo, memo } from 'react';

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
`;
const StyledChart = styled.div`
  width: 80%;
  @media (min-width: 480px) and (max-width: 768px) {
    .chart {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .chart {
      width: 100%;
    }
  }
`;

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip);

const Chart = memo(function Chart({ filteredDogList }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1.5,
      },
    },
    scales: {
      x: {
        border: {
          color: '#ffffff',
        },
        // grid: {
        //   color: '#ffffff',
        // },
        ticks: {
          color: '#ffffff',
          major: {
            enabled: true,
          },
          font: {
            size: 14,
            family: 'monospace',
          },
        },
        title: {
          display: true,
          text: 'Weight (lbs)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'monospace',
          },
        },
      },
      y: {
        border: {
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
          major: {
            enabled: true,
          },
          font: {
            size: 14,
            family: 'monospace',
          },
        },
        title: {
          display: true,
          text: 'Life Span (yrs)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'monospace',
          },
        },
      },
    },
  };

  const createChartData = useMemo(() => {
    const chartData = {
      datasets: [
        {
          data: filteredDogList.map((dog) => ({
            x: dog.weight.imperial,
            y: dog.life_span,
          })),
          backgroundColor: ['#ffffff'],
          borderColor: '#0000FF',
          borderWidth: 0,
        },
      ],
    };
    return chartData;
  }, [filteredDogList]);

  return (
    createChartData && (
      <ChartWrapper>
        <StyledChart>
          <Scatter data={createChartData} options={options} />
        </StyledChart>
      </ChartWrapper>
    )
  );
});

export default Chart;

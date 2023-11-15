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
  height: 400px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 480px) {
    height: 360px;
    margin: 0;
  }
`;
const StyledChart = styled.div`
  width: 60%;
  @media (max-width: 1080px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
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
          color: '#e2e8f0',
        },
        grid: {
          color: '#0000FF',
          lineWidth: 0.5,
        },
        ticks: {
          color: '#e2e8f0',
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
          color: '#e2e8f0',
          font: {
            size: 14,
            family: 'monospace',
          },
        },
      },
      y: {
        border: {
          color: '#e2e8f0',
        },
        grid: {
          color: '#0000FF',
          lineWidth: 0.5,
        },
        ticks: {
          color: '#e2e8f0',
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
          color: '#e2e8f0',
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
      <ChartWrapper name="chartwrapper">
        <StyledChart name="styledchart">
          <Scatter data={createChartData} options={options} name="scatter" />
        </StyledChart>
      </ChartWrapper>
    )
  );
});

export default Chart;

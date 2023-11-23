import styled from 'styled-components';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = memo(function Chart({ filteredDogList }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1.5,
      },
    },
    plugins: {
      legend: {
        display: true,
        responsive: true,
        position: 'top',
        labels: {
          color: '#e2e8f0',
          boxWidth: 36,
          padding: 10,
        },
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

  const calcAvgs = (arr) => {
    let xTot = 0;
    let yTot = 0;
    let count = 0;

    arr.forEach((dog, idx) => {
      xTot += dog.weight.imperial;
      yTot += dog.life_span;
      count++;
    });
    return { xAvg: xTot / count, yAvg: yTot / count };
  };
  const { xAvg, yAvg } = calcAvgs(filteredDogList);

  const firstTermSum = filteredDogList.reduce((acc, { weight, life_span }) => {
    let xDiff = weight.imperial - xAvg;
    let yDiff = life_span - yAvg;
    return acc + xDiff * yDiff;
  }, 0);

  const secondTermSum = filteredDogList.reduce(
    (acc, { weight }) =>
      (weight.imperial - xAvg) * (weight.imperial - xAvg) + acc,
    0
  );

  const slope = firstTermSum / secondTermSum;
  const yIntercept = yAvg - slope * xAvg;
  const yAt200Lb = 200 * slope + yIntercept;
  const regressionData = [
    { x: 0, y: yIntercept },
    { x: 200, y: yAt200Lb },
  ];

  const createChartData = useMemo(() => {
    const chartData = {
      datasets: [
        {
          label: 'breed',
          data: filteredDogList.map((dog) => ({
            x: dog.weight.imperial,
            y: dog.life_span,
          })),
          backgroundColor: ['#ffffff'],
          borderColor: '#0000FF',
          borderWidth: 0,
        },
        {
          type: 'line',
          label: 'average',
          backgroundColor: 'red',
          data: regressionData,
          borderColor: 'orange',
          borderWidth: 1,
          borderDash: [6, 6],
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

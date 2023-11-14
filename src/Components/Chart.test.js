import { render } from '@testing-library/react';
import Chart from './Chart';

describe('Checking all DOM elements appear and submit button works', () => {
  test('Scatter should not pollut props', () => {
    const mockDogList = [
      {
        id: 1,
        name: 'poodle',
        weight: { imperial: 15, metric: 30 },
        height: 30,
        life_span: 10,
      },
      {
        id: 2,
        name: 'labrador',
        weight: { imperial: 10, metric: 20 },
        height: 25,
        life_span: 12,
      },
      {
        id: 3,
        name: 'spaniel',
        weight: { imperial: 12, metric: 24 },
        height: 20,
        life_span: 9,
      },
    ];

    const data = {
      datasets: [
        {
          data: [
            { x: 15, y: 10 },
            { x: 10, y: 12 },
            { x: 12, y: 9 },
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 1.5,
        },
      },
    };
    render(
      <Chart filteredDogList={mockDogList} data={data} options={options} />
    );

    expect(data).toStrictEqual({
      datasets: [
        {
          data: [
            { x: 15, y: 10 },
            { x: 10, y: 12 },
            { x: 12, y: 9 },
          ],
        },
      ],
    });
  });
});

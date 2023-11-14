import { fireEvent, render, screen } from '@testing-library/react';
import Table from './Table';

describe('Checking all DOM elements appear and clicking column works', () => {
  test('Column Headers render on page', () => {
    render(<Table />);
    const col1 = screen.getByText('Name');
    const col2 = screen.getByText('Weight (lbs)');
    const col3 = screen.getByText('Height (in)');
    const col4 = screen.getByText('Life Span (yrs)');
    const col5 = screen.getByText('Breed Group');
    const col6 = screen.getByText('Bred For');
    const col7 = screen.getByText('Image');

    expect(col1).toBeInTheDocument();
    expect(col2).toBeInTheDocument();
    expect(col3).toBeInTheDocument();
    expect(col4).toBeInTheDocument();
    expect(col5).toBeInTheDocument();
    expect(col6).toBeInTheDocument();
    expect(col7).toBeInTheDocument();
  });
  test('Column Header click should trigger handleSort', () => {
    render(<Table />);
    const handleHeaderClickMock = jest.fn();
    const column1Header = screen.getByText('Name');
    column1Header.onclick = handleHeaderClickMock;

    fireEvent.click(column1Header);

    expect(handleHeaderClickMock).toHaveBeenCalled();
  });
});

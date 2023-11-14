import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('Checking all DOM elements appear and submit button works', () => {
  test('renders all elements', () => {
    render(<SearchBar />);

    const form = screen.getByRole('form');
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByText('Search');
    const resetButton = screen.getByText('Reset');
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
  test('form calls onSubmit when user clicks button', () => {
    render(<SearchBar />);
    const handleOnSubmitMock = jest.fn();
    screen.getByRole('form').onsubmit = handleOnSubmitMock;

    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByText('Search');

    // Enter into search input
    fireEvent.change(input, {
      target: { value: 'poodle' },
    });

    // Submit form
    fireEvent.click(searchButton);

    expect(handleOnSubmitMock).toHaveBeenCalled();
  });
});

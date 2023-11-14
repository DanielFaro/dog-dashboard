import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders all elements', () => {
  test('renders all components', () => {
    render(<App />);
    const header = screen.getByText('Dog Breed Finder');
    const subHeader = screen.getByText(
      'Search your favorite breeds and visualize their life!'
    );
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ask questions about the saas architecture fundamentals document/i);
  expect(linkElement).toBeInTheDocument();
});
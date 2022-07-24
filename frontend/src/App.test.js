import { render, screen } from '@testing-library/react';
import App from './App'

import ResizeObserver from './ResizeObserver';


test('test for title', () => {
  render(<App/>);
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
});
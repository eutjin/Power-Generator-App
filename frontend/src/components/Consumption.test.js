import { render, screen } from '@testing-library/react';
import Consumption from './Consumption';

import ResizeObserver from '../ResizeObserver';


test('test for title', () => {
  render(<Consumption/>);
  const linkElement = screen.getByText(/average/i);
  expect(linkElement).toBeInTheDocument();
});
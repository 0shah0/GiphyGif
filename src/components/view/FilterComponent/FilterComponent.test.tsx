import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterComponent from './FilterComponent';

describe('<FilterComponent />', () => {
  test('it should mount', () => {
    render(<FilterComponent />);
    
    const filterComponent = screen.getByTestId('FilterComponent');

    expect(filterComponent).toBeInTheDocument();
  });
});
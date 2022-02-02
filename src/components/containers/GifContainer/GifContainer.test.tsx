import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GifContainer from './GifContainer';

describe('<GifContainer />', () => {
  test('it should mount', () => {
    render(<GifContainer />);
    
    const gifContainer = screen.getByTestId('GifContainer');

    expect(gifContainer).toBeInTheDocument();
  });
});
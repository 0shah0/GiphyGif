import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GifList from './GifList';

describe('<GifList />', () => {
  test('it should mount', () => {
    render(<GifList />);
    
    const gifList = screen.getByTestId('GifList');

    expect(gifList).toBeInTheDocument();
  });
});
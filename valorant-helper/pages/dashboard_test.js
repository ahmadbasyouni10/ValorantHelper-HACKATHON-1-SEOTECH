import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Dashboard from './dashboard';

// Mock axios
jest.mock('axios');

const mockMapsData = [
  [1, "Map1", "URL1", "Image1", "Coordinates1"],
  [2, "Map2", "URL2", "Image2", "Coordinates2"],
  // add more mock data if necessary
];

describe('Dashboard Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockMapsData });
    });
    
    it('renders welcome message', () => {
        render(<Dashboard />);
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });

    it('fetches and displays maps data', async () => {
        render(<Dashboard />);
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/maps');
        });
    });
});
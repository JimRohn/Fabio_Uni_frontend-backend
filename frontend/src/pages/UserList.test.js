// src/pages/PeoplePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PeoplePage from './UserList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('PeoplePage Component', () => {
  test('fetches and displays search results', async () => {
    // Mock the API response
    mock.onPost('http://localhost:3001/search').reply(200, {
      data: [
        { ID: 1, FirstName: 'John', LastName: 'Doe', Department: 'HR', Expertise: 'Recruitment', Email: 'john.doe@example.com', Location: 'New York' },
        { ID: 2, FirstName: 'Jane', LastName: 'Smith', Department: 'IT', Expertise: 'Development', Email: 'jane.smith@example.com', Location: 'San Francisco' }
      ]
    });

    // Render the PeoplePage component
    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/enter keyword/i), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText(/search/i));

    // Assert that the results are displayed
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/hr/i)).toBeInTheDocument();
    expect(await screen.findByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/new york/i)).toBeInTheDocument();
  });

  test('handles misspelled search queries', async () => {
    // Mock the API response for a misspelled query
    mock.onPost('http://localhost:3001/search').reply(200, {
      data: [
        { ID: 1, FirstName: 'John', LastName: 'Doe', Department: 'HR', Expertise: 'Recruitment', Email: 'john.doe@example.com', Location: 'New York' }
      ]
    });

    // Render the PeoplePage component
    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/enter keyword/i), { target: { value: 'emplees' } });
    fireEvent.click(screen.getByText(/search/i));

    // Assert that the results are displayed
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/hr/i)).toBeInTheDocument();
    expect(await screen.findByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/new york/i)).toBeInTheDocument();
  });

  test('displays an error message on network error', async () => {
    // Mock a network error response
    mock.onPost('http://localhost:3001/search').networkError();

    // Render the PeoplePage component
    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/enter keyword/i), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText(/search/i));

    // Assert that the error message is displayed
    expect(await screen.findByText(/error fetching search results/i)).toBeInTheDocument();
  });
});

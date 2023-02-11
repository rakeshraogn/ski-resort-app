import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('shows error message if required fields are not filled', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  const nameInput = getByPlaceholderText('Resort Name');
  const locationInput = getByPlaceholderText('Location');
  const runsInput = getByPlaceholderText('No of Ski Runs');
  const addButton = getByText('Add');

  fireEvent.click(addButton);

  const errorMessage = getByText('Please fill in all the fields.');

  
  expect(errorMessage).toBeInTheDocument();
});

test('Should display error message if the number of ski runs is not an integer', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  const nameInput = getByPlaceholderText('Resort Name');
  const locationInput = getByPlaceholderText('Location');
  const runsInput = getByPlaceholderText('No of Ski Runs');
  const addButton = getByText('Add');
  
  fireEvent.change(nameInput, { target: { value: 'testResort' } });
  fireEvent.change(locationInput, { target: { value: 'testLocation' } });
  fireEvent.change(runsInput, { target: { value: 'InvalidString' } });
  fireEvent.click(addButton);

  const errorMessage = getByText('No. of Ski Runs must be an integer.');
  console.log(errorMessage)
  expect(errorMessage).toBeInTheDocument();
});


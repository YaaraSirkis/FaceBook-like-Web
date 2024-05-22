import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import SignUp from '../SignUp/SignUp';

describe('SignUp Component', () => {

  test('renders the signup form correctly', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const first = screen.getByPlaceholderText('First name');
    const last = screen.getByPlaceholderText('Last name');
    const mobile = screen.getByPlaceholderText('Mobile number or email');
    const pass = screen.getByPlaceholderText('New Password');
    
    expect(first).toBeInTheDocument();
    expect(last).toBeInTheDocument();
    expect(mobile).toBeInTheDocument();
    expect(pass).toBeInTheDocument();
  });

  
  test("username input should change", () => {
    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
        );
    const usernameInputEl = screen.getByPlaceholderText('Mobile number or email');
    const testValue = "test";
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });
  
  test("password input should change", () => {
    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
        );
    const passwordInputEl = screen.getByPlaceholderText('New Password');
    const testValue = "test";
  
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });


});


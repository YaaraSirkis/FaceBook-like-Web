import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import LogIn from '../LogIn/logIn';



describe('LogIn Component', () => {
 



  test('renders the login form correctly', () => {
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email or phone number');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Log In');
    const signUpButton = screen.getByText('Create new account');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  
  test("username input should change", () => {
    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
        );
    const usernameInputEl = screen.getByPlaceholderText('Email or phone number');
    const testValue = "test";
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });

  
  
  test("password input should change", () => {
    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
        );
    const passwordInputEl = screen.getByPlaceholderText('Password');
    const testValue = "test";
  
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  test("button should not be disabled", () => {
    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
    );
    const buttonEl = screen.getByText('Log In'); 
    expect(buttonEl).not.toBeDisabled();


  });

test("button should not be disabled when inputs exist", () => {

    render(
        <MemoryRouter>
            <LogIn />
        </MemoryRouter>
    );
    const buttonEl = screen.getByText('Log In'); 
    const usernameInputEl = screen.getByPlaceholderText('Email or phone number');
    const passwordInputEl = screen.getByPlaceholderText('Password');
  
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  
    expect(buttonEl).not.toBeDisabled();
  });


});
import {render, waitFor, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import React from 'react';
import {MemoryRouter, useNavigate} from 'react-router-dom'
import LogIn from '../LogIn/logIn';

jest.mock('react-router-dom', ()=>{
    const originalNodule = jest.requireActual('react-router-dom');
    return{
        ...originalNodule,
        useNavigate: jest.fn(),
    };  
});

describe('LogIn Component',()=>{
    const testUser = [{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Test123!',
        picture: "/images/user5.jpeg"
      }];

test('logs in and navigate to feed', async()=>{
const setActiveUser =jest.fn();
const navigateMock = jest.fn();
useNavigate.mockReturnValue(navigateMock);

const { getByText,getByPlaceholderText} = render(
    <MemoryRouter><LogIn setActiveUser={setActiveUser} usersList={testUser}/>
    </MemoryRouter>
);

const email = getByPlaceholderText('Email or phone number');
const password = getByPlaceholderText('Password');
const loginButton = getByText ('Log In');

await act(async()=>{
    userEvent.type(email,'johndoe@example.com');
    userEvent.type(password,'Test123!');
    userEvent.click(loginButton);
});

await waitFor(()=>{
    expect(navigateMock).toHaveBeenCalledWith('HomePage');
    expect(navigateMock).toHaveBeenCalledTimes(1);
})

});

});

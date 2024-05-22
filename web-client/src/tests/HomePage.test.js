import {render, screen, waitFor, act, getByText, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeftMenu from '../HomePage/LeftMenu/LeftMenu';
import Posts from '../HomePage/TheFeed/Posts';
import React from 'react';
import {MemoryRouter} from 'react-router-dom'




test('check if user name is in the feed', () => {
    const testUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Test123!',
        picture: "/images/user5.jpeg"
      };
  
      render(<LeftMenu activeUser={testUser} />)
      const userDisplayName = screen.getByText ("John Doe");
      expect(userDisplayName).toBeInTheDocument();
});

// jest.mock('react-router-dom', ()=>{
//     const originalNodule = jest.requireActual('react-router-dom');
//     return{
//         ...originalNodule,
//         useNavigate: jest.fn(),
//     };  
// }); 

// describe('Post Component',()=>{
   
// });


// test('add post', async()=> {
//     const post = [{
//         "id": 11,
//         "userPic": " ",
//         "name": 'John Doe',
//         "text":"yohoooooo",
//         "photo": '',
//         "like": 0,
//         "comments": 0,
//         "commentsInfo":[]
//     }];
//     const testUser = {
//         id: 1,
//         firstName: 'John',
//         lastName: 'Doe',
//         displayName: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'Test123!',
//         picture: "/images/user5.jpeg"
//       };
//     const setPostsList =jest.fn();
//     const navigateMock = jest.fn();
//     useNavigate.mockReturnValue(navigateMock);
   

//     const { getByText,getByPlaceholderText} = render(
//         <MemoryRouter>
//             <UserStatus  
//         activeUser={testUser}
//         setPostsList={setPostsList}
//         postsList={post} />
//         </MemoryRouter>
//     );
//     const text = getByPlaceholderText("What's on your mind?");
//     const newpost = getByText ('Post');

//     await act (async ()=>{
//         userEvent.type(text,'yohoooooo');
//         userEvent.click(newpost);
//     });
       

    
//  await waitFor(()=>{
//     expect(post).toBeInTheDocument();
//  }); 
      
// });



test('Share button', async () => {
    const testUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Test123!',
        picture: "/images/user5.jpeg"
      };

render(
        <MemoryRouter>
            <Posts  activeUser={testUser}/> 
        </MemoryRouter>
    );

   
   const shareButton = screen.getByText("Share");
   
await act (async ()=>{
    userEvent.click(shareButton);
});
const text = screen.getByText('publish now');
   
await waitFor(()=>{
expect(text).toBeInTheDocument();
});  
      
});
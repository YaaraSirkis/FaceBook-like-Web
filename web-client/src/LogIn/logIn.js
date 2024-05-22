import React from 'react';
import './logIn.css';
import foobarImage from './foobar3.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchUser } from '../services/Api';



function LogIn({setActiveUser}) {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);
 



  const handleLogInClick = async () => {
    const user = { email, password };
    const response = await fetch('/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const json = await response.json();
    if (response.status !== 200) {
      setShowInvalidMessage(true);
    } else {
      await setActiveUserByToken(json.token, email);
      navigate('HomePage');
    }
  };

  const setActiveUserByToken = async (token, email) => {
    const response = await fetchUser(token, email);

    if (response.status === 200) {
      const user = await response.json();
      setActiveUser({
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email,
        picture: user.picture,
        friends: user.friends,
        friendRequests: user.friendRequests,
        posts: user.posts,
        userComments:user.userComments,
        token: token
      });
    } else { // if the token is invalid
      console.log("Invalid token");
    }
  }
  






  const handleSignupClick = () => {
    navigate('SignUp');
  };

  return (
    <header id="header">
      <div className="layer"></div>
      <div className="main">
        <div className="left">
          <img src={foobarImage} alt="" />
          <p>Connect with friends and the world around you on Foobar.</p>
        </div>
        <div className="right">
          <div id="form">
            <div className="form_body">
              <input
                type="text"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Show invalid message if needed */}
              {showInvalidMessage && <p id="error">Invalid credentials. Please try again.</p>} 
              <button className="login" onClick={handleLogInClick}>
                Log In
              </button>
              <p className="forget">forgot password?</p>
              <hr />
              <button className="create" onClick={handleSignupClick}>
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}

export default LogIn;
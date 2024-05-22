import React, { useEffect, useState } from "react";
import { fetchUser } from "../../../services/Api";
import FriendRequest from './FriendRequest';
import './FriendRequests.css'



function FriendRequests({ activeUser,setRequestsOpen }) {
  const [requestsList, setRequestsList] = useState(activeUser.friendRequests);
  const [requestsUsers, setRequestsUsers] = useState(undefined);


  useEffect(() => {
    
    const getRequestsUsers = async () => {
      if (requestsList !== undefined) {
        try {
          const usersPromises = requestsList.map(async (email) => {
            const response = await fetchUser(activeUser.token, email);
            const user = await response.json();
            return user;
          });

          const users = await Promise.all(usersPromises);
          await setRequestsUsers([...users]);
        } catch (error){
          console.error("Error fetching users:", error);
        }
      }
    }

    getRequestsUsers();
  }, [activeUser.token, requestsList]);


  return (
    <div className="FriendRequests">
      {console.log(requestsUsers)}
      {requestsUsers === undefined ? 'loding...' : (requestsUsers.length !== 0 ? (
        requestsUsers?.map((user) =>
          <FriendRequest
            key={user.id} // Assuming each user has a unique identifier like an id
            activeUser={activeUser}
            user={user}
            requestsList={requestsList}
            setRequestsList={setRequestsList}
            setRequestsUsers={setRequestsUsers}
            setRequestsOpen={setRequestsOpen}
          />
        )
      ) : (
        <ul className="list-group no">
        <li className="list-group-item d-flex  align-items-center">
        <p>No friend requests</p>
        </li>
        </ul>
      ))}
    </div>
  );



}
export default FriendRequests;
import { useContext } from 'react';
import { userContext } from '../../../App';
import './FriendRequest.css';

function  FriendRequest({activeUser, user, requestsUsers, setRequestsUsers,setRequestsList,setRequestsOpen}) {
    const { setActiveUser } = useContext(userContext)

    const handleAcceptClick = async () => {
        await fetch('/api/users/' + activeUser.email + '/friends/' + user.email, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${activeUser.token}`
            }
        });
        updateList(user);
        //update the active user friends list
        activeUser.friends.push(user.email);
        setActiveUser({...activeUser});
        user.friends.push(activeUser.email)
     

    } 
    
    //this or friendRec?
    const handleDeqlineClick = async () => {
        await fetch('/api/users/' + activeUser.email + '/friendRec/' + user.email, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${activeUser.token}`
            }
        });
        updateList(user);
      
    }

    const updateList = (removedUser) => {
        let index = requestsUsers?.indexOf(user => user.email === removedUser.email);
        requestsUsers?.splice(index, 1);
        if(requestsUsers !== undefined){
        setRequestsUsers([...requestsUsers]);}
        // Find the index of the friend request in the array
        index = activeUser.friendRequests.indexOf(removedUser.email);
        activeUser.friendRequests.splice(index, 1);
        setRequestsList(activeUser.friendRequests);
        setActiveUser({...activeUser});
        setRequestsOpen(false);
    }
    




    return (    
        <div className="Request">
        <ul className="list-group">
            <li className="list-group-item d-flex  align-items-center">
                    <img src={user?.picture} className="card-img-bottom-user" alt="userPic"></img>
                    <span className = "name ">{user?.displayName}</span>
                    <button type="button" class="btn btn-primary" onClick={handleAcceptClick}>
                         <span >Accept</span>
                    </button>
                    <button type="button" class="btn btn-light" onClick={handleDeqlineClick}>
                         <span >Decline</span>
                    </button>
            </li> 
        </ul> 
        </div>     
    );    

}
export default FriendRequest;
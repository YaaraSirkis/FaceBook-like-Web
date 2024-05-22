
import { useContext, useState } from 'react';
import './Profile.css';
import { userContext } from '../App';



function Profile({userPage, sameUser,setUserPage }) {
    const { activeUser,setActiveUser } = useContext(userContext)
    console.log({ setActiveUser })

    const friends = activeUser.friends.includes(userPage.email);
    const [friendRequests, SetFriendRequests] = useState(userPage?.friendsRequest?.includes(activeUser.email));
    const [whatingToAcceptFriend, setWhatingToAcceptFriend] = useState(activeUser.friendRequests.includes(userPage.email));

    const deleteFriend = () => removeFriend(activeUser, userPage, setActiveUser, SetFriendRequests, setWhatingToAcceptFriend)
    
    
    const addFriend = async () => {
        console.log(userPage);
        try {
            const response = await fetch('/api/users/' + activeUser.email + '/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeUser.token}`
                },
                body: JSON.stringify({
                    friendEmail:userPage?.email
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to add ');
            }
           
        } catch (error) {
            console.error('Error add friend:', error);
            // Handle error (e.g., display error message to the user)
        }
        setWhatingToAcceptFriend(!whatingToAcceptFriend);
        userPage.friendRequests.push(activeUser.email);
        setUserPage(userPage);
    }
    
    return (
        
        <div className="Profile">
            <div className="images">
                <img src="/images/back.jpeg" alt="" className="cover" />
                <img src={userPage?.picture} alt="" className="profilePic" />

            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="center">
                        <span>{userPage?.displayName}</span>
                        {!whatingToAcceptFriend && !friendRequests && !friends && !sameUser && <button onClick={addFriend}>add friend</button>}
                        {friends && !sameUser && <button onClick={deleteFriend}>delete friend</button>}
                    </div>

                </div>
            </div>
        </div>




);
}

export default Profile;

async function removeFriend(activeUser, userPage, setActiveUser, SetFriendRequests, setWhatingToAcceptFriend) {
    console.log("Start deletion")
    await fetch('/api/users/' + activeUser.email + '/friends/' + userPage.email, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${activeUser.token}`
        }
    });
    
    const index = activeUser.friends.indexOf(userPage.email);
    activeUser.friends.splice(index, 1);
    setActiveUser({ ...activeUser });
    SetFriendRequests(false);
    setWhatingToAcceptFriend(false);
    
    console.log("Finish deletion")
}

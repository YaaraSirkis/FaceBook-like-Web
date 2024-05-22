
 import './FriendsList.css';

 function FriendsList({user}) {
    
     return (
         <div className="FriendsList">
             <span className = "headLine">friends with</span>
             <ul className="list-group">
                 <li className="list-group-item d-flex  align-items-center">
                     <img src={user?.picture} className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name">{user?.displayName}</span>
                 </li>
             </ul>
         </div>
     )
 };
 export default FriendsList; 
import React from 'react';
 import './LeftMenu.css';
 import { useNavigate } from 'react-router-dom';



 function LeftMenu({activeUser,correnttheme}) {
    const navigate = useNavigate();

    const goToProfile = ()=>{
        navigate('/Profile/'+activeUser.email+'/'+correnttheme);

    }
     return (
             <div className="LeftMenu">
                 <ul className="list-group">
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-person-circle"></i>
                         <span className="ms-2" onClick={goToProfile}>{activeUser.displayName}</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-people-fill"></i>
                         <span className=" ms-2">Friends</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-clock"></i>
                         <span className="ms-2">Memories</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-download"></i>
                         <span className="ms-2">Saved</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-person-raised-hand"></i>
                         <span className="ms-2">Groups</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-camera-reels"></i>
                         <span className="ms-2">Video</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-shop"></i>
                         <span className="ms-2">Marketplace</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-messenger"></i>
                         <span className="ms-2">Messenger</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-calendar-month"></i>
                         <span className="ms-2">Events</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-controller"></i>
                         <span className="ms-2">Games</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-chat-right-text"></i>
                         <span className="ms-2">Feeds</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-flower1"></i>
                         <span className="ms-2">Clomate Science Center</span>
                     </li>
                     <li className="list-group-item d-flex align-items-center">
                         <i className="bi bi-arrow-up-circle"></i>
                         <span className="ms-2">See less</span>
                     </li>
                 </ul>
             </div>


     );
 }
 export default LeftMenu; 
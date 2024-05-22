import React from 'react';
 import './Contacts.css';


 function Contacts() {
     return (
         <div className="Contacts">
             <span className = "headLine">Groups</span>
             <ul className="list-group">
                 <li className="list-group-item d-flex  align-items-center">
                     <img src="/images/barilan.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">My Bar Ilan</span>
                 </li>
                 <li className="list-group-item d-flex align-items-center">

                     <img src="/images/gossip.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">Gossip Girl Fans</span>
                 </li>
                 <li className="list-group-item d-flex  align-items-center">

                     <img src="/images/Cookies.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">We Love Chocolate Chip Cookies</span>
                 </li>
                 <li className="list-group-item d-flex  align-items-center">

                     <img src="/images/fun.png" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">Fun In The Sun</span>
                 </li>
                 <li className="list-group-item d-flex  align-items-center">

                     <img src="/images/cry.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">Jobs For Poor Students</span>
                 </li>
                 <li className="list-group-item d-flex  align-items-center">

                     <img src="/images/apple.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">Apples Lover</span>
                 </li>
                 <li  className="list-group-item d-flex  align-items-center">

                     <img src="/images/gang.jpeg" className="card-img-bottom-user" alt="userPec"></img>
                     <span className = "name ">Kochi Gang</span>
                 </li>
             </ul>
         </div>
     )
 };
 export default Contacts; 
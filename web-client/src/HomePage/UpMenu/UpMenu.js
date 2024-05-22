import React from 'react';
import { useState } from 'react';
import './UpMenu.css';
import foobar from './foobar.jpeg';
import MenuLogOut from './MenuLogOut';
import FriendRequests from './FriendRequests/FriendRequests';
import UpdateUser from './UpdateUser';



function UpMenu({activeUser, changeTheme, setActiveUser, postsList, setPostsList,getPosts}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [requestsOpen, setRequestsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
   
    return (
        <div className="UpMenu">
            <div className="leftSide">
                <img src={activeUser.picture} className="card-img-bottom small-image" alt="userPec" onClick={() => setMenuOpen(!menuOpen)}></img>
                <i class="bi bi-pencil-square" onClick={() => setEditOpen(!editOpen)}></i>
                <i className="bi bi-bell-fill"></i>
                <i className="bi bi-messenger"></i>
                <i className="bi bi-chat-square-dots"></i>
                <i className="bi bi-moon" onClick={changeTheme}></i>
                {menuOpen && <MenuLogOut activeUser = {activeUser} postsList={postsList} setPostsList={setPostsList}/>}
                {editOpen && <UpdateUser activeUser={activeUser}
                editOpen={editOpen} setEditOpen={setEditOpen} setActiveUser={setActiveUser}
                postsList={postsList} setPostsList={setPostsList} getPosts={getPosts} />}
            </div>
            
            <div className="middelSide">
                <i className="bi bi-house-door-fill ms-5"></i>
                <i className="bi bi-play-btn"></i>
                <i className="bi bi-shop-window"></i>
                <i className="bi bi-person-fill-down" onClick={() => setRequestsOpen(!requestsOpen)}></i>
                <i className="bi bi-asterisk"></i>
                {requestsOpen && <FriendRequests activeUser = {activeUser} setRequestsOpen={setRequestsOpen}/>}
                
            </div>
            <form className="d-flex" role="search">
                <input className="form-control" type="search" placeholder="Search Foobar"
                    aria-label="Search"></input>
            </form>
            <div className="foobarImg">
                <img src={foobar} className="card-img-bottom" alt="foobar.png" style={{height:'100%'}}></img>
            </div>
        </div>


    );
}

export default UpMenu; 
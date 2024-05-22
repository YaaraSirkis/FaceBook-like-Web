import React, { useState } from 'react';
import './UserStatus.css';
import { uploadImage } from '../../services/Api';

function UserStatus({ setPostsList, postsList, activeUser }) {
    const [photo, setPic] = useState('')
    const [search, setSearch] = useState('')
    const [showInvalidMessage, setShowInvalidMessage] = useState(false);
    

    const addPost = async (text, photo ,activeUser) => {
        if (photo) {
            const updatedImage = await uploadImage(photo);
           // photo = updatedImage;
           photo = updatedImage;
        }
        setShowInvalidMessage(false);
         try {
             const response = await fetch('/api/users/' + activeUser.email + '/posts', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${activeUser.token}`
                 },
                 body: JSON.stringify({
                    userPic: activeUser.picture,
                    name:activeUser.displayName,
                    email:activeUser.email,
                    text:text,
                    photo: photo,
                    like: 0,
                    comments: 0,
                })
             });
             if (!response.ok) {
                throw new Error('Failed to edit post');
            }
            else{
         
             const newPost = await response.json(); 
             const post = {
                "_id": newPost?._id,
                "userPic": activeUser.picture,
                "name":activeUser.displayName,
                "email":activeUser.email,
                "text":text,
                "photo": photo,
                "like": 0,
                "comments": 0,
                "commentsInfo":[]
            }
            setPostsList([post, ...postsList])
            activeUser.posts.push(post._id);
            setShowInvalidMessage(false);
        }
         } catch (error) {
             console.log(error);
             setShowInvalidMessage(true);
         }

         //reset the status
        setSearch('');
        setPic('');
    }

    return (
        <div className="status">
            <div className="card">
                <div className="row">
                    <div className="enterStatuse">
                        <img src={activeUser.picture} className="card-img-bottom" alt="userPec"></img>
                        <div className="statusetext">
                            <input value={search} onChange={e => setSearch(e.currentTarget.value)} className="search" placeholder="What's on your mind?"
                                aria-label="Search"></input>
                        </div>
                        {showInvalidMessage && <p id="error">Invalid URL. Please try again.</p>} 
                        <div className='statusePic'>
                            <input className="form-control" onChange={e => setPic(e.target.files[0])} type="file" id="formFile"></input>
                        </div>
                    </div>
                </div>
                <div className="statusButton">
                    <button type="button" className="btn btn-light" onClick={() =>addPost(search, photo, activeUser)}>Post</button>
                    <button type="button" className="btn btn-light">Live video</button>
                    <button type="button" className="btn btn-light">Photo/video</button>
                    <button type="button" className="btn btn-light">Feeling/activity</button>
                </div>
            </div>

        </div>
    );
}
export default UserStatus; 
import React, { useState } from 'react';
import './Comments.css';
import EditComment from './EditComment';


function Comments({ activeUser, email, _id, photo, name, text, onEditedComment, onDeleteComment }) {
    const [editOpen, setEditOpen] = useState(false);

    const editedComment = (text) => {
        const comment = {
            "_id": _id,
            "userPic": photo,
            "name": name,
            "email": email,
            "text": text
        }
        onEditedComment(comment)
        setEditOpen(!editOpen);
    }

    const deleteComment = () => {
        onDeleteComment(_id);
        setEditOpen(!editOpen);
    }

    const chackIfOwner = () => {
        if (activeUser.email === email) {
            setEditOpen(!editOpen);
        }
    }


    return (
        <div className='Comments'>
            <div className='comments'>
                <img src={photo} alt=" " />
                <div className='info'>
                    <span className="name">{name}</span>
                    <p className="text">{text}</p>
                </div>
                <div className='edit-button'>
                    <button type="button" class="btn btn-light" onClick={() => chackIfOwner()}><i class="bi bi-three-dots"></i></button>
                </div>
            </div>

            {editOpen && <EditComment text={text} editedComment={editedComment} deleteComment={deleteComment} />}

        </div>
    );
}
export default Comments; 
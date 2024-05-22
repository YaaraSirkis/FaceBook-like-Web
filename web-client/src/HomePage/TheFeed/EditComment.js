
import React, { useState } from 'react';
import './EditComment.css';

function EditComment({text, editedComment, deleteComment}) {
    const [editedText, setEditedText] = useState('')
    

    const editComment = () => {
        if (editedText ===''){
            setEditedText(text);
        }
        editedComment(editedText); 
    }
    return (
        <div class="card-edit-comment">
            <div class="row">
                <div class="editStatuse">
                    <div class="editStatusetext">
                        <input value={editedText} onChange={e => setEditedText(e.currentTarget.value)} class="search" placeholder={text}
                            aria-label="Search"></input>
                    </div>
                   
                </div>
            </div>
            <div class="editStatusButton">
                <button type="button" class="btn btn-light" onClick={() => editComment(text)}>Edit</button>
                <button type="button" class="btn btn-light" onClick={deleteComment}>Delete</button>
            </div>

        </div>

    );
}
export default EditComment; 
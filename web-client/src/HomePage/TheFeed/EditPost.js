
import React, { useState } from 'react';
import './EditPost.css';
import { uploadImage } from '../../services/Api';

function EditPost({ photo, text, addEditedPost,editOpen,setEditOpen }) {
    const [pic, setPic] = useState(photo)
    const [editedText, setEditedText] = useState(text)
    

    const editPost = () => {
        if (editedText===''){
            setEditedText(text);
        }
        if (pic === "") {
            setPic(photo)
            addEditedPost(editedText, pic)     
        }
        else{
            addEditedPost(editedText, pic) 
        }
        setEditOpen(!editOpen);
        setEditedText('');
    }

    return (
<div className='EditPost'>
        <div className="card-edit">
            <div className="row">
                <div className="editStatuse">
                    <div className="editStatusetext">
                        <input value={editedText} onChange={e => setEditedText(e.currentTarget.value)} class="search" placeholder={text}
                            aria-label="Search"></input>
                    </div>
                    <div className='editStatusePic'>
                        <input className="form-control" onChange={async e => setPic(await uploadImage(e.target.files[0]))} type="file" id="formFile"></input>
                    </div>
                </div>
            </div>
            <div className="editStatusButton">
                <button type="button" className="btn btn-light" onClick={() => editPost(text, pic)} >Save Edit</button>
            </div>

        </div>
        </div>

    );
}
export default EditPost; 
import React from 'react';
import './MenuLogOut.css';
import { useNavigate } from 'react-router-dom';


function MenuLogOut({activeUser, postsList, setPostsList}) {
const navigate = useNavigate();


const handleCloseClick = () => {
    // Navigate to the login page
    navigate('/');
};

const deleteAllUsersPosts = async()=>{
    activeUser.posts.map((_id)=>
    deletePost(_id)
    )
}



const deleteAllUsersComments = async()=>{
    activeUser.userComments.map((_id)=>
    deleteComment(_id)
    )
}

const deleteComment = async (cid)=>{
    try {
        const response = await fetch('/api/users/' + activeUser.email + '/posts/comments/' + cid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${activeUser.token}`
            },
        });
        const newPost = await response.json();
        if(newPost !=null){
        const postIndex = postsList.findIndex(post => post._id === newPost._id);
        postsList[postIndex]=newPost;
        setPostsList([...postsList]);
        }
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        // Post deleted successfully
    } catch (error) {
        console.error('Error deleting post:', error);
        // Handle error (e.g., display error message to the user)
    }
}


const deletePost = async (_id)=>{
    try {
        const response = await fetch('/api/users/' + activeUser.email + '/posts/' + _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${activeUser.token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        // Post deleted successfully
    } catch (error) {
        console.error('Error deleting post:', error);
        // Handle error (e.g., display error message to the user)
    }
}

const handleDeleteClick = async () => {
    await deleteAllUsersComments();
    console.log("user post");
    await deleteAllUsersPosts();
    await deleteUser();
}
const deleteUser = async ()=>{
    const response = await fetch('/api/users/' + activeUser.email , {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${activeUser.token}`
      }
    });
    if (response.status === 200) {
        console.log("user deleted");
        navigate('/');
    } else {
        console.log("Invalid token");
    }
 
}

    return (
        <div className='MenuLogOut'>
            <button type="button" class="btn btn-light" onClick={handleCloseClick}>
                         <span >Log Out</span>
            </button>
            <button type="button" class="btn btn-light" onClick={handleDeleteClick}>
                         <span >delete account</span>
            </button>
         
        </div>
            );    
}
export default MenuLogOut; 
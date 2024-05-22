
import './CommentGen.css';
import { useContext, useState } from 'react';
import { userContext } from '../../App';



function CommentGen({pid,activeUser ,commentsList, setCommentsList,onAddComment}) {

const { setActiveUser } = useContext(userContext)

    const [search, setSearch] = useState('');
    const addComments = async (text, activeUser) => {
        try {
            console.log('pid');
             const response=await fetch('/api/users/' + activeUser.email + '/posts/' + pid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeUser.token}`
                },
                body: JSON.stringify({
                    photo:activeUser.picture,
                    name:activeUser.displayName,
                    text:text

                })
            });
            console.log('pid2');
            const newComment = await response.json(); 
            const comment = {
                "_id": newComment._id,
                "photo":activeUser.picture,
                "email" : activeUser.email,
                "name":activeUser.displayName,
                "text": text,
                "postRoot":pid
            }
        
            await setCommentsList([comment, ...commentsList]);
            activeUser.userComments.push(comment._id);
            await setActiveUser({...activeUser});
            onAddComment(pid,comment);

        } catch (error) {
            console.log(error);
        }
        //reset the status
   
        setSearch('');
    }
    
   
    return (
        <div className='Comments'>
            <div className='writeComment'>
                <img src={activeUser.picture} alt="userpic" />
                <input class="search" value={search} onChange={e => setSearch(e.currentTarget.value)} placeholder="write a comment?"
                    aria-label="Search"></input>
                <div className='set'>
                    <button className='set-button' onClick={() => addComments(search, activeUser)}>set</button>
                </div>
            </div>
        </div>
    );
}

export default CommentGen; 

import './Posts.css';
import { useState, useContext } from 'react';
import Comments from './Comments';
import Share from './Share';
import CommentGen from './CommentGen';
import EditPost from './EditPost';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { userContext } from '../../App';




function Posts({ activeUser, postsList, setPostsList, _id, userPic, name, text, photo, date, like, comments, commentsInfo, email, correnttheme, setCommentsList }) {
    const { setActiveUser } = useContext(userContext)
    const [commentOpen, setCommentOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const [showInvalidMessage, setShowInvalidMessage] = useState(false);

    const onLikeClicked = () => {
        if (!liked) {
            onLike(1)
        }
        else { onLike(-1) } setLiked(!liked)
    }

    const onLike = async (numLikes) => {
        const postIndex = postsList.findIndex(post => post._id === _id);
        postsList[postIndex].like += numLikes;
        setPostsList([...postsList]);
        await editPostOnServer(postsList[postIndex]);
    }

    const addEditedPost = (text, pic) => {
        const post = {
            "_id": _id,
            "userPic": userPic,
            "name": name,
            "email": activeUser.email,
            "text": text,
            "photo": pic,
            "like": like,
            "comments": comments,
            "commentsInfo": commentsInfo
        }
        onEdit(post);
    }

    const onEdit = async (editedPost) => {
        await editPostOnServer(editedPost);
    }

    const onEditWeb = (editedPost) => {
        const postIndex = postsList.findIndex(post => post._id === editedPost._id);
        postsList[postIndex].text = editedPost.text;
        postsList[postIndex].photo = editedPost.photo;
        setPostsList([...postsList]);
        
    }

    const editPostOnServer = async (editedPost) => {
        setShowInvalidMessage(false);
        try {
            const response = await fetch('/api/users/' + activeUser.email + '/posts/' + editedPost._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeUser.token}`
                },
                body: JSON.stringify(editedPost)
            }); 
            if (!response.ok) {
                throw new Error('Failed to edit post');
            }
            else{
            onEditWeb (editedPost);
            setShowInvalidMessage(false);
            }
        } catch (error) {
            console.error('Error edit post:', error);
            setShowInvalidMessage(true);
        }
    }

    const updateDeleteCommentsCount = async (pid, cid) => {
        const postIndex = postsList.findIndex(post => post._id === pid);
        postsList[postIndex].comments--;
        setPostsList([...postsList]);
        await deleteCommentOnServer(pid, cid);
    }
    const deleteCommentOnServer = async (pid, cid) => {
        try {
            const response = await fetch('/api/users/' + activeUser.email + '/posts/' + pid + '/' + cid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeUser.token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

           
        } catch (error) {
            console.error('Error deleting comment:', error);
            // Handle error (e.g., display error message to the user)
        }

    }

    const deletePost = async () => {
        const postIndex = postsList.findIndex(post => post._id === _id);
        if (name === activeUser.displayName) {
            postsList.splice(postIndex, 1);
            setPostsList([...postsList]);
            const index = activeUser.posts.indexOf(_id);
            activeUser.posts.splice(index, 1);
            setActiveUser({ ...activeUser });

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
    }


    const onAddComment = async (_id, comment) => {
        const postIndex = postsList.findIndex(post => post._id === _id);
        postsList[postIndex].comments++;
        await setPostsList([...postsList])
        console.log(commentsInfo);
        console.log(postsList[postIndex].commentsInfo);
    }


    const onEditedComment = async (editComment) => {
        const commentIndex = commentsInfo.findIndex(comment => comment._id === editComment._id);
        commentsInfo[commentIndex].text = editComment.text;
        setCommentsList([...commentsInfo]);

        try {
            const result = await fetch('/api/users/' + activeUser.email + '/posts/' + _id + '/' + editComment._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeUser.token}`
                },
                body: JSON.stringify(editComment)
            });
            console.log("comment edited", result);
            console.log("comment edited", result.status);

        } catch (error) {
            console.log(error);
        }
    }


    const onDeleteComment = (cid) => {
        const commentIndex = commentsInfo.findIndex(comment => comment._id === cid);
        commentsInfo.splice(commentIndex, 1);
        setCommentsList([...commentsInfo]);
        const commentIndexUser = activeUser.userComments.indexOf(cid);
        activeUser.userComments.splice(commentIndexUser, 1);
        setActiveUser({ ...activeUser });
        updateDeleteCommentsCount(_id, cid);
    }

    const onShareClicked = () => {
        if (commentOpen) {
            setCommentOpen(!commentOpen)
        }
        setShareOpen(!shareOpen)
    }
    const onCommentsClicked = () => {
        if (shareOpen) {
            setShareOpen(!shareOpen)
        }
        setCommentOpen(!commentOpen)
    }

    const checkOwner = () => {
        if (name === activeUser.displayName) {
            setEditOpen(!editOpen)
        }
    }

    const goToProfile = () => {
        navigate('/Profile/' + email + '/' + correnttheme);
    }

    return (
        <div className="posts">
            <div className="card">
                <div className='upPost'>
                    <button type="button-close" className="btn-close" onClick={deletePost}></button>
                    <div className='edit'>
                        <button type="button" className="btn btn-light" onClick={checkOwner}><i className="bi bi-three-dots"></i></button>
                        {editOpen && <EditPost photo={photo} text={text} addEditedPost={addEditedPost} setEditOpen={setEditOpen} editOpen={editOpen} />}
                        {showInvalidMessage && <p id="error">Invalid URL. Please try again.</p>} 
                    </div>
                </div>

                <div className="post">
                    <div className='user'>
                        <div className='userInfo'>
                            <img src={userPic} className="card-img-bottom" alt="userPec" onClick={goToProfile}></img>
                            <div className='information'>
                                <span className="name" onClick={goToProfile}>{name}</span>
                                <span className='date'>{moment(date).format('L')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='body'>
                        <p className="card-text">{text}</p>
                        <img src={photo} className="card-img" alt=""></img>
                    </div>
                    <div className="postsInfo">
                        <div className="infleft">
                            <span>{like} likes</span>
                        </div>
                        <div className="infright">
                            <span>{comments} comments</span>
                        </div>
                    </div>
                    <div className="bottonPosts">
                        <div className="item">
                            <button type="button" className="btn btn-light" onClick={onLikeClicked}><i className="bi bi-suit-heart"></i> Likes</button>
                        </div>

                        <div className="item">
                            <button type="button" className="btn btn-light" onClick={() => onCommentsClicked()}><i className="bi bi-chat-dots"></i> Comments </button>
                        </div>
                        <div className="item">
                            <button type="button" className="btn btn-light" onClick={() => onShareClicked()}><i className="bi bi-arrow-up-left-circle"></i> Share </button>
                        </div>
                    </div>

                    {shareOpen && <Share />}

                    {commentOpen && <CommentGen
                        pid={_id}
                        activeUser={activeUser}
                        commentsList={commentsInfo}
                        setCommentsList={setCommentsList}
                        onAddComment={onAddComment} />}
                    {commentOpen && commentsInfo.map((comment) =>
                        <Comments {...comment}
                            activeUser={activeUser}
                            onEditedComment={onEditedComment}
                            onDeleteComment={onDeleteComment}
                            key={comment._id} />)}


                </div>

            </div>

        </div>
    );
}
export default Posts; 
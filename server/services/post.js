const { get } = require('mongoose');
const { populateModelSymbol } = require('mongoose/lib/helpers/symbols');
const Post = require('../models/post');
const Comment = require('../models/comment');
const userService = require('./user');
const comment = require('../models/comment');
const post = require('../models/post');
const TCPClient = require('../TCPClient');

const createPost = async (userPic, name, text, photo, date, like, comments, commentsInfo, email) => {
    const post = new Post({
        userPic,
        name,
        date,
        email
    });

    await userService.addPostToUser(email, post);
    if (text) post.text = text;
    if (photo) post.photo = photo;
    if (like) post.like = like;
    if (comments) post.comments = comments;
    if (commentsInfo) post.commentsInfo = commentsInfo;
    return await post.save();
};

const getPostsByUser = async (email) => {return await Post.find({email:email});}

const getPosts = async () => { return await Post.find(); };

const getPost = async (pid) => { return await Post.findById(pid); };

const getComment = async (cid) => { return await Comment.findById(cid); };

const iteratePosts = async (activeUserEmail) => {
    const data = await getPosts();
    const user = await userService.getUser(activeUserEmail);

    // Filter posts into two groups: posts by friends and posts by non-friends
    const postsByFriends = [];
    const postsByNonFriends = [];
    data.forEach(post => {
        if (user.friends.includes(post.email) || post.email === activeUserEmail) {
            postsByFriends.push(post);
        } else {
            postsByNonFriends.push(post);
        }
    });
    const sortPostsByFriends = [...postsByFriends].sort((a, b) => new Date(b.date) - new Date(a.date));
    const sortPostsByNonFriends = [...postsByNonFriends].sort((a, b) => new Date(b.date) - new Date(a.date));
    // Determine the maximum number of posts to return from each category
    const maxNonFriendPosts = Math.min(sortPostsByNonFriends.length, 5);
    const maxFriendPosts = Math.min(sortPostsByFriends.length, 20);
    
    // Take the first maxNonFriendPosts posts from the non-friends group and the first maxFriendPosts posts from the friends group
     const chosenPosts = sortPostsByNonFriends.slice(0, maxNonFriendPosts).concat(sortPostsByFriends.slice(0, maxFriendPosts));
    // Take the first 5 posts from the non-friends group and the first 20 posts from the friends group
    const sortChosenPosts = [...chosenPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortChosenPosts;
};

// const updatePost = async ( _id, text, photo, like, comments, date, commentsInfo,userPic,name) => {
//     const post = await getPost(_id);
//     if (!post) return null;
//     if (text) post.text = text;
//     if (name) post.name=name;
//     if (userPic) post.userPic=userPic;
//     if (photo) post.photo = photo;
//     if (date !=undefined) post.date = date;
//     if (like != undefined) post.like = like;
//     if (comments != undefined) post.comments = comments;
//     if (commentsInfo) post.commentsInfo=commentsInfo;
//     return await post.save();
// }

const updatePost = async ( post, text, photo, like, comments, date, commentsInfo,userPic,name) => {
    if (text) post.text = text;
    if (name) post.name=name;
    if (userPic) post.userPic=userPic;
    if (photo) post.photo = photo;
    if (date !=undefined) post.date = date;
    if (like != undefined) post.like = like;
    if (comments != undefined) post.comments = comments;
    if (commentsInfo) post.commentsInfo=commentsInfo;
    return await post.save();
}

const updateComment = async (email,cid,photo,name) => {
    const myComment = await Comment.findById(cid);
    myComment.name=name;
    myComment.photo=photo;
    await myComment.save();
    console.log(myComment);
    const post = await getPost(myComment.postId);
    if (!post) return null;
    const index = post.commentsInfo.findIndex(comment => comment._id.toString() === cid.toString());
    post.commentsInfo[index].name=name;
    post.commentsInfo[index].photo=photo;
    return await post.save();
}
const newComment = async (email, pid,text,photo,name) => {
    const post = await getPost(pid);
    if (!post) return null;
    const comment = new Comment({
    name:name,
    email:email,
    text:text,
    photo:photo,
    postId:pid
    })
    try {
        await addCommentToPost(post, comment);
        await userService.addCommentToUser(email,comment._id);
    }
    catch (error) {
        throw new Error('Error adding comment to post: ' + error.message);
    }
    return await comment.save();
}

const addCommentToPost = async ( post,comment) => {
    post.commentsInfo.push(comment);
    return await updatePost(post._id, post.text, post.photo, post.like, post.comments+1, post.date, post.commentsInfo);
}

const deleteComment = async (email,pid,cid) => {
    var post = await getPost(pid);
    if (!post) return null;
    userService.deleteCommentFromUser(email,cid);
    post.commentsInfo.pull({ _id: cid }); 
    post.comments-=1;
    await Comment.findOneAndDelete({_id:cid});
    return await post.save();
}

const deleteUserComment = async (cid) => {
    const comment = await getComment(cid);
    if (!comment) return null;
    const postID = comment.postId;

    var post = await getPost(postID);
    if (!post) return null;
    post.commentsInfo.pull({ _id: cid }); 
    post.comments-=1;
    await Comment.findOneAndDelete({_id:cid});
    return await post.save();
}

const deletePost = async (email,_id) => {
    const post = await Post.findOneAndDelete({ _id: _id });
    const comments = post.commentsInfo;
    for (var i = 0; i < comments.length; i++) {
        await Comment.findOneAndDelete({ _id: comments[i]._id });
    }
    if (!post) {
        throw new Error('Post not found');
    }
    await userService.deletePostFromUser (email,_id);    
}

    

const editComment = async (pid,cid,text) => {
    var post = await getPost(pid);
    if (!post) return null;
    var myComment = await Comment.findById(cid);
    myComment.text=text;
    //console.log(myComment);
    //console.log( post.commentsInfo);
    const index = post.commentsInfo.findIndex(comment => comment._id.toString() === cid.toString());
    post.commentsInfo[index].text=text;
    await myComment.save();
    return await post.save();
}

const checkURL = async (text) => {
    const urlRegex = /((?:http|ftp|https)?:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    let match;
    let response;
    let approvePost = true;
    //const serverAddress = '127.0.0.1';
    //const serverPort = 5555;
    const serverAddress = process.env.TCP_ADDRESS;
    const serverPort = process.env.TCP_PORT;
    
    while ((match = urlRegex.exec(text)) !== null) {
        const url = match[0];
        const client = new TCPClient(serverAddress, serverPort);
        const sendURL = '2 ' + url;
        response = await client.send(sendURL);
        //the url is in the bloom filter, meaning it is a bad url
        if (response === 'true true\n') {
            approvePost = false;
            break;
        }
    };
    return approvePost;
}

// const checkURL = async (text) => {
//     const urlRegex = /((?:http|ftp|https)?:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
//     let match;
//     let response = 'true';
//     let urls = '';
    
//     // Find all URLs in the text and accumulate them into the 'urls' string separated by newlines
//     while ((match = urlRegex.exec(text)) !== null) {
//         const url = match[0];
//        // urls += '2 ' + url + '\n';
//        urls += '2 ' + url;
//     }

//     // If no URLs found, return response 'true'
//     if (urls === '') {
//         return response;
//     }
//     // Instantiate TCPClient
//     const serverAddress = '127.0.0.1';
//     const serverPort = 5555;
//     const client = new TCPClient(serverAddress, serverPort);

//     // Send the accumulated URLs
//     response = await client.send(urls);
//     return response;
// };

module.exports = {iteratePosts, deletePost, editComment, createPost, 
    getPosts, getPost, updatePost, deletePost,newComment,deleteComment, 
    editComment, getPostsByUser,updateComment, getComment,deleteUserComment,checkURL};


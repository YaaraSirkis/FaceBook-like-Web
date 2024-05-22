const { text } = require('body-parser');
const postService = require('../services/post');
const tokenService = require('../services/token');

const createPost = async (req, res) => {
    const email = req.params.email;
    const { userPic, name, text, photo, date, like, comments, commentsInfo } = req.body;
    const token = req.headers.authorization;
    // Check if there is URL in the text and if its valid
    if (text) {
        const response = await postService.checkURL(text);
        if (response == false) {
            return res.status(400).json({ errors: 'bad URL' });
        }
    }
    // passed all checks, create the post
    const post = await postService.createPost(userPic, name, text, photo, date, like, comments, commentsInfo, email, token);
    res.json(post);
};

// const createPost = async (req, res) => {
//     const email = req.params.email;
//     const { userPic, name, text, photo, date, like, comments, commentsInfo } = req.body;
//     const token = req.headers.authorization;
//     const post = await postService.createPost(userPic, name, text, photo, date, like, comments, commentsInfo, email, token);
//     res.json(post);
// };


const getPosts = async (req, res) => {
    try {
        const activeUserEmail = tokenService.verifyTokenPosts(req.headers.authorization);

        res.json(await postService.iteratePosts(activeUserEmail));
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
    
}

const getPost = async (req, res) => {
    const post = await postService.getPost(req.params.id);
    if (!post) {
       return res.status(404).json({ errors: ['Post not found'] })
    } 
    
        res.json(post);
}

const getComment = async (req, res) => {
    const comment = await postService.getComment(req.params.cid);
    if (!comment) {
       return res.status(404).json({ errors: ['Post not found'] })
    } 
    
        res.json(comment);
}

const getPostsByUser = async (req, res) => {
    res.json(await postService.getPostsByUser(req.params.email));

 }

//  const updatePost = async (req, res) => {
//     const post = await postService.updatePost(req.params.pid, req.body.text, req.body.photo,req.body.like, req.body.comments, req.body.date,req.body.commentsInfo,req.body.userPic,req.body.name);
//     if (!post) {
//         return res.status(404).json({ errors: ['Post not found'] });
//     }
//     res.json(post);
// }

const updatePost = async (req, res) => {
    //get the post from DB
    let post = await postService.getPost(req.params.pid);
    if (!post) {
        return res.status(404).json({ errors: ['Post not found'] });
    }
    // Check if there is URL in the text and if its valid
    const text = req.body.text;
    if (text) {
    const response = await postService.checkURL(text);
        if (response == false) {
            return res.status(400).json({ errors: 'bad URL' });
        }
    }
    // passed all checks, update the post
    post = await postService.updatePost(post, req.body.text, req.body.photo,req.body.like, req.body.comments, req.body.date,req.body.commentsInfo,req.body.userPic,req.body.name);
    res.json(post);
}

const newCommentsInfo = async (req, res) => {
    try {
        const comment = await postService.newComment(req.params.email, req.params.pid,req.body.text, req.body.photo,req.body.name);
        res.json(comment);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    } 
}

const updateComment = async (req, res) => {
    const post =await postService.updateComment(req.params.email,req.params.cid, req.body.photo,req.body.name);
    res.json(post);
}

const deleteComment = async (req, res) => {
    try {
        const post= await postService.deleteComment(req.params.email, req.params.pid,req.params.cid);
        res.json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
const deleteUserComment = async (req, res) => {
    try {
        const post= await postService.deleteUserComment(req.params.cid);
        res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}




const deletePost = async (req, res) => {
    try {
        await postService.deletePost(req.params.email, req.params.pid);
        return res.status(200).send({ message: 'post deleted' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

    
}

const updateCommentsInfo = async (req, res) => {
    const post = await postService.editComment(req.params.pid,req.params.cid,req.body.text);
    res.json(post);
}

module.exports = { createPost, getPosts, getPost, getPostsByUser, updatePost, deletePost,newCommentsInfo,deleteComment,updateCommentsInfo,updateComment,getComment,deleteUserComment};
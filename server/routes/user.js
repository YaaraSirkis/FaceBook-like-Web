const userController = require('../controllers/user');
const tokenController = require("../controllers/token");
const postController = require ('../controllers/post');
const express = require('express');
var router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(tokenController.verifyToken, userController.getUser);

    router.route('/:email')
    .get(tokenController.verifyToken, userController.getUser)
    .patch(tokenController.verifyToken, userController.updateUser)
    .delete(tokenController.verifyToken, userController.deleteUser);

router.route('/:email/friends')
    .get(tokenController.verifyToken, userController.getFriends)
    .post(tokenController.verifyToken, userController.sendFriendRequest);

router.route('/:id/friends/:fid')
    .patch(tokenController.verifyToken, userController.acceptFriendRequest)
    .delete(tokenController.verifyToken,userController.deleteFriend);
    

router.route('/:id/friendRec/:fid')
    .delete(tokenController.verifyToken, userController.declineFriendRequest);

router.route('/:email/posts')
    .get(tokenController.verifyToken, postController.getPostsByUser)
    .post(tokenController.verifyToken, postController.createPost);

router.route('/:email/posts/:pid')
//delte the delete, update?
    .delete(tokenController.verifyToken, postController.deletePost)
    .post(tokenController.verifyToken, postController.newCommentsInfo)
    .patch(tokenController.verifyToken, postController.updatePost);

    router.route('/:email/comments/:cid')
    .patch(tokenController.verifyToken, postController.updateComment)
    .get(tokenController.verifyToken, postController.getComment);
    
    router.route('/:email/posts/comments/:cid')
    .delete(tokenController.verifyToken, postController.deleteUserComment);

    router.route('/:email/posts/comments/:cid')
    .delete(tokenController.verifyToken, postController.deleteUserComment);

    router.route('/:email/posts/:pid/:cid')
    .delete(tokenController.verifyToken, postController.deleteComment)
    .patch(tokenController.verifyToken, postController.updateCommentsInfo);


//delete it?
 router.route('/:email/comments')
    .get(tokenController.verifyToken, userController.getCommentsByUser);
    

module.exports = router;
const postController = require('../controllers/post');
const tokenController = require("../controllers/token");
const express = require('express');
var router = express.Router();

router.route('/')
    .get(postController.getPosts);


router.route('/:id')    
.post(tokenController.verifyToken, postController.createPost)
.get(tokenController.verifyToken, postController.getPost)


module.exports = router;


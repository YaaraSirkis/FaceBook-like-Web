const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for comments
const comment = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
  //      required: true
    },
    text: {
        type: String
    },
    photo: {
        type: String,
        required: true
    }
});


const post = new Schema({

    userPic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        //required: true
    },
    text: {
        type: String
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    commentsInfo: {
        type: [comment], // Array of commentSchema
        default: [] // Empty array by default
    }
});
module.exports = mongoose.model('post', post);






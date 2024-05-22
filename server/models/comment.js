const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;
// Define schema for comments
const comment = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    postId:{
        type: String
    }
});
module.exports = mongoose.model('comment', comment);
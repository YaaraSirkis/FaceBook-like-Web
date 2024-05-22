const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: [] 
    },

    friendRequests: {
        type: Array,
        default: []
    },
    posts: {
        type: Array,
        default: []
    }, 
    userComments: {
        type: Array,
        default: []
    }
});
module.exports = mongoose.model('user', user);
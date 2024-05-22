const UserPass = require('../models/userPass');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const secretKey = "foobarShhh...";

const createToken = async (email, password) => {
    const user = await UserPass.findOne({ email });

    if (user === null) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Password is incorrect');
    }

    

    // Generate the token.
    return jwt.sign({ email }, secretKey)
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return data;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

const verifyTokenPosts = (token) => {
    try {
        const splitedToken = token.split(' ')[1];
        const data = jwt.verify(splitedToken, secretKey);
        const email = data.email;
        return email;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

module.exports = { createToken, verifyToken, verifyTokenPosts };
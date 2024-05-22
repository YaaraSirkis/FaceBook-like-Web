const express = require('express');
const bodyParser = require('body-parser');
const customEnv = require('custom-env');
const mongoose = require('mongoose');
const fs = require('fs');
const Post = require('./models/post');
const User = require('./models/user');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

const cors = require('cors');
app.use(cors());


customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT);

//connect to the TCP server- bloom filter
const TCPClient = require('./TCPClient');
//const serverAddress = '127.0.0.1';
//const serverPort = 5555;
const serverAddress = process.env.TCP_ADDRESS;
const serverPort = process.env.TCP_PORT;
const client = new TCPClient(serverAddress, serverPort);
console.log('Connecting to the TCP server...');

try {
    //initialize the bloom filter
    client.send('8 1 1');
    //get the bad urls fro the env file
    const badURLs = process.env.URL_LIST;
    if (badURLs) {
        const urls = badURLs.split(' ');
        urls.forEach(url => {
            client.send('1 ' + url);
        });
    } else {
        console.log('No bad URLs in the environment file');
    }
} catch (err) {
    console.error('Error connecting to the TCP server:', err);
}



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    // Check if the User collection is empty
    User.countDocuments({})
        .then(count => {
            // If User collection is empty, populate it with data from JSON file
            if (count === 0) {
                const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
                return User.insertMany(usersData);
            } else {
                return Promise.resolve();
            }
        })
        .then(() => console.log('Users inserted successfully'))
        .catch(err => console.error('Error checking or inserting users:', err));

    // Check if the Post collection is empty
    Post.countDocuments({})
        .then(count => {
            // If Post collection is empty, populate it with data from JSON file
            if (count === 0) {
                const postsData = JSON.parse(fs.readFileSync('posts.json', 'utf-8'));
                return Post.insertMany(postsData);
            } else {
                return Promise.resolve();
            }
        })
        .then(() => console.log('Posts inserted successfully'))
        .catch(err => console.error('Error checking or inserting posts:', err));
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// Serve static files from the 'public' directory
app.use(express.static('public'));



const posts = require('./routes/post');
const users = require('./routes/user');
const token = require('./routes/token');
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/token', token);


app.listen(process.env.PORT);
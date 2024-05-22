First, go see our wiki


# Social Media - FooBar
Foobar is a social media application inspired by platforms like Facebook. It provides both a web client and an Android app for users to connect and share updates. This README file provides an overview of the project, installation instructions, and details about its components.

## Getting Started

- **When running the server, if the MongoDB is empty, it will insert automatically the default posts and users. If there is any problem, you can find the posts.json, and users.json on ./server**
- Notice that for now, you can find the Android App in a different [repository](https://github.com/Shahar2612/ProjectPart2-Android.git).

### Dependencies

This project requires the following dependencies:

* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [npm](https://www.npmjs.com/) - Package manager for JavaScript
* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [MongoDB](https://www.mongodb.com/) - NoSQL database

### Installation

Clone the repository: 
```bash
git clone https://github.com/Shahar2612/ProjectPart2-Web.git
```

Download the necessary dependencies for both the web-client and the server, by running 

```
npm i --force
```
### Executing The Program

To run the Program, navigate to the server directory, and run the following command:

```bash
npm start
```

if you are using mac, run the following command:

```bash
npm run yaara
```

then open [http://localhost:8080](http://localhost:8080) 
to view it in your browser.

To run the android client, open the android studio app on the android client folder. make sure that your android sdk has a correct config, and run it from there (of course you can run it both on an emulator, a phisycal device).

## Design

### Web Client workflow

The client is built on React. It is responsible for displaying the user interface, and communicating with the server.

There is one thing to note about the client's workflow. When a user logs in, the server returns a JWT token. The client then stores this token in local storage, and uses this token to authenticate the user in every request to the server. When the user logs out, the client deletes the token from the local storage.

```mermaid
sequenceDiagram
    Client->>+Server: Token request
    Server->>+Client: Token
    Client-->>+Server: ... + Token
    Server-->>-Client: ...
```

## What can you do?
First, you need to create a new account, then you can log in and use FoBar! 
* You can add, edit and delete posts only if the posts is yours.
* You can add, edit and delete comments only if the comments is yours. 
* You can edit your user name and picture if you click on the edit img in the up menu (next to your picture in the up menu).
* You can log out or delete your account if you click on your picture in the up menu.
* You can change light mood to dark mood if you click on the moon img.
* You can like and unlike a post, etc.
* You can click on the name or picture in each post and get to the personal profile page of the author of the post, where you can also send a friend request or if you are already friends - see the user posts, friends list and an option to delete the user from your friend list.
* You can see your friends requests list if you click on the grup img in the middel of the up menu. There you can also approve or decline the requests.

### Android Client workflow

Our Android client mirrors the web client's functionality, distinguished by its refined design employing the MVVM architecture.
The app utilizing a local Room database. This  plays a crucial role in enhancing the user experience by providing seamless access to data even in offline scenarios. 

```mermaid
graph LR;
    A(Activity) --> G([RecycleView Adapter]);
    A --Operation --> B(View Model);
    B --Notification --> A;
    B --Operation --> C(Repository);
    C --Notification --> B;
    C <--> E([Room]);
     C <--> F([Web-sevice Api]);
```

## Server API

The server is built on Node.js and Express.js. It's responsible for handling the client's requests, and communicating with the database.

The server exposes it's functionality through a REST API. Here's a list of the API's endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/token | POST | Returns a JWT token for the user |
| /api/users | POST | Registers a new user |
| /api/users/:email | GET | Returns the user's information |
| /api/users/:email | PATCH | updates the user's information |
| /api/users/:email | DELETE | Deletes the user |
| /api/users/:email/friends | GET | Returns the user friends |
| /api/users/:email/friends | POST | Send a new friend request to the user |
| /api/users/:email/friends/:fid | GET | Accept a friend request |
| /api/users/:email/friends/:fid | DELETE | Deletes a user from the friends list |
| /api/users/:email/friendRec/:fid | DELETE | Decline friend request |
| /api/users/:email/posts | GET | Returns the user's posts|
| /api/users/:email/posts | POST | Creates new post|
| /api/users/:email/posts/:fid | DELETE | Deletes a post|
| /api/users/:email/posts/:fid | POST | Creates a new comment|
| /api/users/:email/posts/:fid | PATCH | Updates a post|
| /api/users/:email/comments/:cid | GET | Returns the comment's information|
| /api/users/:email/posts/:pid/:cid | DELETE | Deletes a comment|
| /api/users/:email/posts/:pid/:cid | PATCH | Updates a comment|
| /api/posts | GET | Returns 25 posts|

**Note:** besides the first two endpoints, all the other endpoints require the user to be authenticated. The authentication is done by sending the JWT token in the request's header.

## Server Architecture

The server is designed using the MVCS architecture (except for the view, since there is no user interface). Here's a simple diagram of the server's architecture:

```mermaid
graph LR;
    C(client) --request --> D{controller};
    D --relevant params --> service;
    service <--> B((data));
    service --result --> D;
    D --response -->C;
```

### Notes

- According to the assignment instructions, when a user logs in and reaches the main page, the application displays up to 25 posts. Five of these posts are from users who are not friends with the logged-in user, while the remaining posts are from friends of the user. This ensures a diverse and dynamic feed for a better user experience.

- The android client supports english, textual messages only (only ascii charachters)

- The posts date times show up with times from the GMT+2 time zone

## Authors
[Shahar Chen](https://github.com/Shahar2612)  
[Yaara Sirkis](https://github.com/YaaraSirkis)  
[Meitar Teper](https://github.com/MeitarTeper)

## Screenshots Exampels
#### Login
<img width="250" alt="Log in Android" src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/dd9d8d99-f48c-462b-b4ab-3c7158aa3ebc">
<img width="498" alt="log in web" src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/ebeaf121-9953-47f5-a24e-8982e41b2c90" width = "550">

#### Registration

<img width="250" alt="register android" src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/9dd28ee3-c47e-4a1e-8895-533d0da58e3e">
<img width="350" alt="register web" src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/c0ed2fc9-2aee-4e0f-bb6f-7db5d4283a86">

#### Feed
<img width="250" alt="feed android"  src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/45ace2f4-1b03-4b47-b7af-508af44c8689">
<img width="800" alt="feed web"  src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/bb1de384-a739-428a-baf0-2fc82ac4967b">


#### Profile | Friend Request

![profile android](https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/4426f730-5698-45df-b8ed-e8c185e5b4aa)
<img width="800" alt="prifile web"  src="https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/d73e94ee-3953-4826-bb2c-687b21c533d6">


#### Accept Friend Request

![friend android](https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/f31b0d4d-3173-430d-8d70-2d25146c153e)
![friend web](https://github.com/Shahar2612/ProjectPart2-Android/assets/155824766/6d05cb55-8eb1-4cad-a243-56f771123ef6)



const User = require('../models/user');
const userPass = require('../models/userPass');
const { get } = require('mongoose');

const getUsers = async () => { return await User.find(); };

const createUser = async (firstName, lastName, password, email, picture ) => { 
    const user = await User.findOne({ email : email });

    if (user !== null) {
        throw new Error('User already exists');
    }
try {
    await User.create({
        firstName,
        lastName,
        displayName : firstName + " " + lastName,
        email,
        picture,
        //password
    });
    await userPass.create({
        email,
        password
    });
} catch (error) {
    console.error("Error creating user:", error);
}

}



const getUser = async (email) => { 
    try {
        const user = await User.findOne({email: email});
        return user;
    } catch (error) {
        throw new Error('User not found');
    }
     
};

const updateUser = async (email,firstName, lastName, displayName, picture) => {
    const user = await getUser(email);
    if (!user) return null;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (displayName) user.displayName = displayName;
    if (picture) user.picture = picture;
    return await user.save();
}

const deleteFriend = async (id,fid) => {
    try {
        const user = await getUser(id);
        if (!user) return null;
        const index1 = user.friends.indexOf(fid);
        user.friends.splice(index1,1);
     
        const userFriend = await getUser(fid);
        if (!userFriend) return null;
        const index2 = userFriend.friends.indexOf(id);
        userFriend.friends.splice(index2,1);
        await user.save();
        return await userFriend.save();
    } catch (error) {
        throw new Error('user not found');
    }
}

const deleteUser = async (email) => {
    try {
        const deletedUser = await getUser(email);
        console.log(deletedUser)
        console.log(deletedUser.friends)
        if(deletedUser.friends.length !==0){
        await deleteUserFromHisFriends(deletedUser.friends,email);
        }
        await User.findOneAndDelete(deletedUser);
    } catch (error) {
        throw new Error('user not found');
    }
}

const deleteUserFromHisFriends = async (friends, email)=>{
    friends.map( async (friendEmail)=>{
        const friend = await getUser(friendEmail);
        if (!friend) return null;
        const index = friend.friends.indexOf(email);
        friend.friends.splice(index, 1);
        await friend.save();
    })
}

const getFriends = async (id) => {
    const user = await getUser(id);
    if (!user) return null;
    return user.friends;
}

const sendFriendRequest = async (email, newRequestEmail) => {
    const sender = await getUser(email);
    const receiver = await getUser(newRequestEmail);

    if (!sender || !receiver) {
        throw new Error('Sender or receiver not found');
    }
    try{
    receiver.friendRequests.push(email);
    await receiver.save();
    }catch (error) {
        throw new Error('error sending friend request');
    }
}

const acceptFriendRequest = async (userId, friendId) => {
    const user = await getUser(userId);
    const friend = await getUser(friendId);
    if (!user || !friend) return null;
    try{
    const index = user.friendRequests.indexOf(friendId);
    //splice is an array method that changes the contents of an array by removing or replacing existing elements and/or adding new elements.
    // here it is used to remove one element from the user.friendRequests array at the specified index.
    user.friendRequests.splice(index, 1);
    user.friends.push(friend.email);
    friend.friends.push(user.email);
    await user.save();
    await friend.save();
    }catch (error) {
        throw new Error('error accepting friend request');
    }
}

const declineFriendRequest = async (userId, friendId) => {
    const user = await getUser(userId);
    if (!user) return null;
    try{
    const index = user.friendRequests.indexOf(friendId);
    user.friendRequests.splice(index, 1);
    await user.save();
    }catch (error) {
        throw new Error('error declining friend request');
    }
}


const addPostToUser = async (email, post)=> {
    return User.findOneAndUpdate(
        { email: email },
        { $push: {posts: post._id}}
    );
}

const deletePostFromUser = async (email, pid) => {
    const user = await getUser(email);
    const index = user.posts.indexOf(pid);
    // If the post is found, remove it from the array
    if (index !== -1) {
        user.posts.splice(index, 1);
    }
    console.log(user);
    // Save the updated user
    return await user.save();
  
}




//dont delete im useing itttt
const addCommentToUser = async (email, cid) => {
    const user = await getUser(email);
    if (!user) throw new Error('User not found');
    user.userComments.push(cid);
    await user.save();
}


//dont delete im useing itttt
const deleteCommentFromUser = async (email, cid) => {
    const user = await getUser(email);
    if (!user) throw new Error('User not found');

   const index = user.userComments.indexOf(cid);
   user.userComments.splice(index, 1);
    await user.save();
}

//i am not using it
const getCommentsByUser = async (email) => {
    try {
        const comments = await UserComments.findOne({ email: email }).populate('comments');
        if (!comments) {
            throw new Error('Comments not found');
        }
        return comments.comments; // Return the populated comments array
    } catch (error) {
        throw new Error('Error fetching comments: ' + error.message);
    }
};

//getCommentsByUser = async (email) => { return await Comment.find({email:email}); }
    



module.exports = { createUser, getUser, updateUser, deleteUser, getFriends, 
    sendFriendRequest, acceptFriendRequest, declineFriendRequest,addPostToUser, 
    deletePostFromUser, getUsers, addCommentToUser, deleteCommentFromUser, getCommentsByUser,deleteFriend};



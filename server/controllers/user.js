const userService = require('../services/user');



const getUsers = async (req, res) => {
    res.json(await userService.getUsers());
}


const createUser = async (req, res) => {
    const { firstName, lastName, email, password , picture} = req.body;
    
    try {
        await userService.createUser(firstName, lastName, password, email, picture);
        return res.status(200).send({ message: 'User created' });
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.email);
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
    
}

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.email,req.body.firstName,req.body.lastName,req.body.displayName,req.body.picture);
    if (!user) {
        //add try catch
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
}

const deleteFriend = async (req, res) => {
    try {
        const userFriend = await userService.deleteFriend(req.params.id,req.params.fid);
        return res.status(200).json(userFriend);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.email);
        return res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const getFriends = async (req, res) => {
    res.json(await userService.getFriends(req.params.id));
}

const sendFriendRequest = async (req, res) => {
    try{
        await userService.sendFriendRequest(req.params.email, req.body.friendEmail)
        return res.status(200).json({ message: 'friend request sent' });
    }catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const acceptFriendRequest = async (req, res) => {
    try{
    await userService.acceptFriendRequest(req.params.id, req.params.fid);
    return res.status(200).json({ message: 'friend request accepted' });
    }catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const declineFriendRequest = async (req, res) => {
    try{
    await userService.declineFriendRequest(req.params.id, req.params.friendId);
    return res.status(200).json({ message: 'friend request declined' });

    }catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const getCommentsByUser = async (req, res) => {
    try{
        const comments = await userService.getCommentsByUser(req.params.email);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


module.exports = { createUser, getUser, updateUser, deleteUser, getFriends, sendFriendRequest, acceptFriendRequest, declineFriendRequest, getUsers,deleteFriend,getCommentsByUser};



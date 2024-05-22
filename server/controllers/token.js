const tokenService = require('../services/token');

const createToken = async (req, res) => {
    const { email, password } = req.body;
        try {
            const token = await tokenService.createToken(email, password);
            return res.status(200).json({token});
        } catch (error) {
            return res.status(404).json({message: error.message});
        } 
    }


const verifyToken = async (req, res, next) => {
    if (req.headers.authorization == null) {
        return res.status(403).send("Token required");    
    }

    const token = req.headers.authorization.split(' ')[1];
    
    try {
        var email = req.params.email;
        email = tokenService.verifyToken(token).email;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized");
    }
}

module.exports = { createToken, verifyToken };
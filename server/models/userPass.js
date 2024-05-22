const mongoose = require("mongoose");

const userPass = new mongoose.Schema({
    email: {
        type: String,
        //nullable: true,
    },

    password: {
        type: String,
        //nullable: true,
    },
});

module.exports = mongoose.model("userPass", userPass);
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minLength: 3, required: true },
    password: { type: String, required: true },
    email:{ type: String, unique: true}
    // refreshToken: { type: "string", default: null },
})

const User = mongoose.model('User', userSchema)
module.exports = User
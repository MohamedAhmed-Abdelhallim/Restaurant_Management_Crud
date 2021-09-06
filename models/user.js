const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minLength: 3, required: true },
    password: { type: String, required: true },
    email:{ type: String, unique: true}
    // refreshToken: { type: "string", default: null },
})

userSchema.pre('save', function (next) {
    if (this.isNew) { //check if new doc
        bcrypt.hash(this.password, 10, (err, hashedText) => {
            if (err) console.error(err)
            this.password = hashedText;
            next();
        })
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (err) {
        console.error(err)
        return false
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User
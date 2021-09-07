const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // userId:{type:String,unique:true,required:true},
    username: { type: String, unique: true, minLength: 3, required: true },
    password: { type: String, required: true },
    email:{ type: String, unique: true},
    // myRestaurants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
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
const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name: { type: String, unique: true, minLength: 3, required: true },
    description: { type: String },
    imageUrl:{ type: String},
    ownedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
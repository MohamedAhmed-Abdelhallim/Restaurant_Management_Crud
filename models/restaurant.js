const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name: { type: String, unique: true, minLength: 3, required: true },
    description: { type: String, required: true },
    imageUrl:{ type: String, unique: true}
    // refreshToken: { type: "string", default: null },
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
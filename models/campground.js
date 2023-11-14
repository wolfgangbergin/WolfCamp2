const mongoose = require('mongoose')


const CampgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: String,
    description: String,
    location: String,
    wolfman: String,
    })


module.exports = mongoose.model('Campground', CampgroundSchema)
const mongoose = require('mongoose')


const CampgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    wolfman: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
    })


module.exports = mongoose.model('Campground', CampgroundSchema)
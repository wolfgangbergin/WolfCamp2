const mongoose = require('mongoose')
const Campground = require('../models/campground')
const Review = require('../models/review')


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


CampgroundSchema.post('findOneAndDelete', async function (data) {
  
    if (data) {
        const res = await Review.deleteMany({ _id: { $in: data.reviews } })
        l(res)
    }
  
}
)

// farmSchema.post('findOneAndDelete', async function (data) {
//   if (data.products.length) {
//     const res = await Product.deleteMany({ _id: { $in: data.products } })
//     console.log(res)
//   }
// })



module.exports = mongoose.model('Campground', CampgroundSchema)
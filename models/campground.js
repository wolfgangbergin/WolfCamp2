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
      ref: 'Review',
    },
  ],
})

CampgroundSchema.post('findOneAndDelete', async function (data) {
  if (data) {
   data.reviews.forEach(async(item)=>{
   const temp1 = await Review.findByIdAndDelete(item._id)
   l(temp1)
   })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema)

const CampgroundSchema = new mongoose.Schema({
  title: String,


  images: [
    {
      url: String,
      filename: String,
    },
  ],





  itemss: {
    type: [ {
      url: String,
      filename: String,
    },
  ], 
    validate: {
      validator: function(arr) {
        return arr.length <= 10; // Limit array to a maximum of 10 items
      },
      message: 'The array exceeds the limit of 10 items.'
    }
  },


  price: Number,
  description: String,
  location: String,
  wolfman: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
})

CampgroundSchema.post('findOneAndDelete', async function (data) {
  if (data) {
    data.reviews.forEach(async (ele) => {
      const temp1 = await Review.findByIdAndDelete(ele._id)
    })
  }
})
//const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
module.exports = mongoose.model('Campground', CampgroundSchema)

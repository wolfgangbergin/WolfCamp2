

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
})

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200')
})

const CampgroundSchema = new mongoose.Schema({
  title: String,
  geometry: {       
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  images: {
    type: [ImageSchema],
    validate: {
      validator: function (arr) {
        return arr.length <= 10 // Limit array to a maximum of 10 items
      },
      message: 'The array exceeds the limit of 5 items.',
    },
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

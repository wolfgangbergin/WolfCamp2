

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

    data.reviews.forEach(async(ele)=>{
        const temp1 = await Review.findByIdAndDelete(ele._id)
        l(temp1)
    })
   
  }
})
//const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
module.exports = mongoose.model('Campground', CampgroundSchema)

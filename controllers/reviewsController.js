


const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'deleted a review!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds/${id}`)
  }




const postReview = async (req, res) => {
    const newObject = {
      rating: req.body.review.rating,
      body: req.body.review.body,
      author: req.user._id,
      authorName: req.user.username,
    }

  
    const campground = await Campground.findById(req.params.id)
    const review = new Review(newObject)
    campground.reviews.push(review)

    await Promise.all([review.save(), campground.save()])
    req.flash('success', 'created a new review!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds/${campground._id}`)
  }






  module.exports = {
    postReview,
    deleteReview,
    }
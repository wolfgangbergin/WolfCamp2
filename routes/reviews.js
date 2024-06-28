router.delete(
  '/:id/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params

    const campground = await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    })

    await Review.findByIdAndDelete(reviewId)
    req.flash('success', ' review deleted!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds/${campground._id}`)
  })
)

router.post(
  '/:id',
  validateRevieww,
  isLoggedIn,
  catchAsync(async (req, res) => {
    const newObject = {
      rating: req.body.review.rating,
      body: req.body.review.body,
      author: req.user._id,
      authorName: req.user.username,
    }
    const campground = await Campground.findById(req.params.id)
    const review = new Review(newObject)
    //l(req.body.review)
    // l(req.user._id)


     //l(review._id)

    
    
    campground.reviews.push(await review.populate('author'))
    
    await Promise.all([review.save(), campground.save()])
    req.flash('success', 'created a new review!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds/${campground._id}`)

    const temp1 = await Review.findById(review._id).populate('author')
   // l(temp1.author.username)
    l(req.user.username)
  })
)

module.exports = router

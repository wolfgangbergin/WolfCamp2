

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
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)

    campground.reviews.push(review)

    await Promise.all([review.save(), campground.save()])
    req.flash('success', 'created a new review!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds/${campground._id}`)
  })
)

module.exports = router

const { postReview } = require("../controllers/reviewsController")

router.delete(
  '/:id/:reviewId',
  isLoggedIn,
  isReviewOwner,
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
  catchAsync(postReview)
)

module.exports = router

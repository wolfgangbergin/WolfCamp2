const router = express.Router()

const {
  validateCampground,

  validateReview,
} = require('../utils/campgroundSchema')

router.delete(
  '/reviews/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params

    const campground = await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    })

    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${campground._id}`)
  })
)

router.post(
  '/reviews',
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)

    campground.reviews.push(review)

    await Promise.all([review.save(), campground.save()])

    res.redirect(`/campgrounds/${campground._id}`)
  })
)

module.exports = router

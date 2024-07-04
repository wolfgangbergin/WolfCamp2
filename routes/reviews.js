
router.delete(
  '/:id/:reviewId',
  isLoggedIn,
  isReviewOwner,
  catchAsync(reviewsController.deleteReview)
)

router.post('/:id', validateRevieww, isLoggedIn, catchAsync(reviewsController.postReview))

module.exports = router

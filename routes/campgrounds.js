router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  catchAsync(campgroundsController.editCampgroundGet)
)

router.use('/deleteAll', campgroundsController.deleteAll)

router.get('/new', isLoggedIn, campgroundsController.newCampgroundGet)


router
  .route('/:id')
  .get(catchAsync(campgroundsController.showCampgroundGet))
  .put(
    isLoggedIn,
    validateCampground,
    isOwner,
    catchAsync(campgroundsController.editCampgroundPut)
  )
  .delete(
    isLoggedIn,
    isOwner,
    catchAsync(campgroundsController.deleteCampground)
  )

router
  .route('/')
  .get(catchAsync(campgroundsController.indexGet))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgroundsController.newCampgroundPost)
  )

module.exports = router

router.use('/deleteAll', campgroundsController.deleteAll)

router.get('/', catchAsync(campgroundsController.indexGet))

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(campgroundsController.newCampgroundPost)
)

router.get('/new', isLoggedIn, campgroundsController.newCampgroundGet)

router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  catchAsync(campgroundsController.editCmapgroundGet)
)

router.put(
  '/:id',
  isLoggedIn,
  validateCampground,
  isOwner,
  catchAsync(campgroundsController.editCampgroundPut)
)

router.get('/:id', catchAsync(campgroundsController.showCampgroundGet))




router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(campgroundsController.deleteCampground)
)


module.exports = router

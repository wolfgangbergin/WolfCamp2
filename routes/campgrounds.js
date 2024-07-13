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
    isOwner,
    upload.array("image"),
    validateCampground,
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
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundsController.newCampgroundPost)
  )
  //.post(upload.array("image"), (req, res) => {console.log(req.body, req.files); res.send('It worked')})

module.exports = router

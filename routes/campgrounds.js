//const { deleteAll } = require("../controllers/campgroundsController")


router.get('/deleteAll', campgroundsController.deleteAll)

router.get('/', catchAsync(campgroundsController.index))

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(campgroundsController.newCampgroundPost)
)

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgroundsController.updateCampgroungGet))

router.put(
  '/:id',
  isLoggedIn,
  validateCampground,
  isOwner,
  catchAsync(campgroundsController.updateCampgroundPut)
)

router.get('/:id', catchAsync(campgroundsController.newCampgroundGet))

router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(campgroundsController.deleteCampground)
)

module.exports = router

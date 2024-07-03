router.use('/deleteAll', campgroundsController.deleteAll)

router.get(
  '/',
  catchAsync(campgroundsController.indexGet)
)

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id

    await campground.save()
    req.flash('success', 'Successfully made a new campground!!! 🎉🎉🎉🎉')
    res.redirect(`/campgrounds`)
  })
)

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
      req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
      return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
  })
)



router.put(
  '/:id',
  isLoggedIn,
  validateCampground,
  isOwner,
  catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(
      req.params.id,
      { ...req.body.campground },
      { runValidators: true, new: true }
    )
    if (!campground) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    req.flash('success', ' campground updated')
    res.redirect(`/campgrounds`)
  })
)

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
        },
      })
      .populate('author')

      l(campground?.reviews[0]?.author?.username)

    if (!campground) {
      req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
      return res.redirect('/campgrounds')
    }

    res.render('campgrounds/show', { campground })
  })
)

router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', ' campground deleted!!! 🎉🎉🎉🎉')
    res.redirect('/campgrounds')
  })
)

module.exports = router

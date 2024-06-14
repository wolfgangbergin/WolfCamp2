const router = express.Router()

router.use('/deleteAll', (req, res) => {
  Campground.deleteMany({}).then(() => {
    res.redirect('/campgrounds')
  })
})

router.get(
  '/',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})

    if (!campgrounds) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }

    campgrounds.reverse()

    res.render('campgrounds/index', { campgrounds })
  })
)

router.post(
  '/',
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)

    await campground.save()
    res.redirect(`/campgrounds`)
  })
)

router.get('/new', (req, res) => {
  res.render('campgrounds/new')
})

router.get(
  '/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.render('campgrounds/edit', { campground })
  })
)

router.put(
  '/:id',
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(
      req.params.id,
      { ...req.body.campground },
      { runValidators: true, new: true }
    )
    if (!campground) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.redirect(`/campgrounds`)
  })
)

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      'reviews'
    )

    if (!campground) {
      throw new ExpressError('Campground not found!!! 💩💩💩💩🤪🤪🤪🤪', 515)
    }
    res.render('campgrounds/show', { campground })
  })
)

router.delete(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
  })
)

module.exports = router

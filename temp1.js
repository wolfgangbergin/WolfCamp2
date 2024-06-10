app.post(
  '/campgrounds',
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)

    await campground.save()
    res.redirect(`/campgrounds`)
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
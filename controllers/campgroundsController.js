const deleteAll = async (req, res) => {
  await Campground.deleteMany({})
  res.redirect('/campgrounds')
}

const indexGet = async (req, res) => {
  const campgrounds = await Campground.find({})
  if (!campgrounds) {
    throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
  }

  campgrounds.reverse()

  res.render('campgrounds/index', { campgrounds })
}

const newCampgroundPost = async (req, res, next) => {
  const campground = new Campground(req.body.campground)
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }))
  campground.author = req.user._id

  await campground.save()
l(campground)
  req.flash('success', 'Successfully made a new campground!!! 🎉🎉🎉🎉')
  res.redirect(`/campgrounds`)
}

const newCampgroundGet = (req, res) => {
  res.render('campgrounds/new')
}

const editCampgroundGet = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  if (!campground) {
    req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
    return res.redirect('/campgrounds')
  }

  res.render('campgrounds/edit', { campground })
}

const editCampgroundPut = async (req, res) => {
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
}

const showCampgroundGet = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('author')

  if (!campground) {
    req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
    return res.redirect('/campgrounds')
  }
  
  res.render('campgrounds/show', { campground })
}

const deleteCampground = async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id)
  req.flash('success', ' campground deleted!!! 🎉🎉🎉🎉')
  res.redirect('/campgrounds')
}

module.exports = {
  deleteAll,
  indexGet,
  newCampgroundPost,
  newCampgroundGet,
  editCampgroundGet,
  editCampgroundPut,
  showCampgroundGet,

  deleteCampground,
}

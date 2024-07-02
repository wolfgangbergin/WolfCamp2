const deleteAll = async (req, res) => {
  l('deleteAll')
  await Campground.deleteMany({})
  res.redirect('/campgrounds')
  
}

const index = async (req, res) => {
  const campgrounds = await Campground.find({})

  if (!campgrounds) {
    throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
  }

  campgrounds.reverse()

  res.render('campgrounds/index', { campgrounds })
}

const newCampgroundPost = async (req, res, next) => {
  const campground = new Campground(req.body.campground)
  campground.author = req.user._id

  await campground.save()
  req.flash('success', 'Successfully made a new campground!!! 🎉🎉🎉🎉')
  res.redirect(`/campgrounds`)
}

const campgroundShowGet = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  if (!campground) {
    req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
    return res.redirect('/campgrounds')
  }
  l('test919')

  res.render('campgrounds/show', { campground })
}

const updateCampgroundPut = async (req, res) => {
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

const updateCampgroungGet = async (req, res) => {
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
  l('test919')

  res.render('campgrounds/edit', { campground })
}

const deleteCampground = async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id)
  req.flash('success', 'Campground deleted')
  res.redirect('/campgrounds')
}
module.exports = {
  deleteAll,
  index,
  newCampgroundPost,
  campgroundShowGet,
  updateCampgroundPut,
  updateCampgroungGet,
  deleteCampground,
}

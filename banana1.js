const editCmapgroundGet = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
      req.flash('error', 'Cannot find that campground!!! 💩💩💩💩')
      return res.redirect('/campgrounds')
    }
   
    res.render('campgrounds/edit', { campground })
  }


async function deleteAllImagesInFolder(folderName) {
  try {
    // List all resources in the folder
    let result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderName, // Folder name
      max_results: 500 // Maximum number of results (adjust as needed)
    });

    // Get public IDs of the resources
    let publicIds = result.resources.map(resource => resource.public_id);

    // Delete resources in batches
    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
      console.log(`Deleted ${publicIds.length} images from folder: ${folderName}`);
    } else {
      console.log(`No images found in folder: ${folderName}`);
    }
  } catch (error) {
    console.error('Error deleting images:', error);
  }
}

// Call the function with your folder name




const deleteAll = async (req, res) => {
  await Campground.deleteMany({})
  deleteAllImagesInFolder('WolfCamp');
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
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }))
  campground.images.push(...imgs)
  await campground.save()

if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename)
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    })
  }

  

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
  let campground = await Campground.findByIdAndDelete(id)

 

  if (campground?.images) {
    for (let image of campground?.images) {
      l('image', image.filename)
      await cloudinary.uploader.destroy(image.filename)
    }
   
  }

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

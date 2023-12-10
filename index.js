require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')
const Review = require('./models/review')
const {
  validateCampground,

  validateReview,
} = require('./utils/campgroundSchema')

mongoose
  .connect('mongodb://127.0.0.1:27017/wolf-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get(
  '/campgrounds',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    if (!campgrounds) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.render('campgrounds/index', { campgrounds })
  })
)

app.post(
  '/campgrounds',
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)

    await campground.save()
    res.redirect(`/campgrounds`)
  })
)

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

app.get(
  '/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.render('campgrounds/edit', { campground })
  })
)

app.put(
  '/campgrounds/:id',
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

app.get(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.render('campgrounds/show', { campground })
  })
)

app.delete(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    res.redirect('/campgrounds')
  })
)

app.post(
  '/campgrounds/:id/reviews',
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)

    campground.reviews.push(review)

    await Promise.all([review.save(), campground.save()])

    res.redirect(`/campgrounds/${campground._id}`)
  })
)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found🥜🥜', 404))
})

app.use((err, req, res, next) => {
  
  if (!err.message) {
    err.message = 'Something went wrong'
  }
  if (!err.statusCode) {
    err.statusCode = 515
  }
  res.status(err.statusCode).render('error', { err })
})

app.listen(3000, () => {
  l('listening on port 3000')
})

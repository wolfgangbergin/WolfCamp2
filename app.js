require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')


mongoose
  .connect('mongodb://127.0.0.1:27017/wolf-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
})

app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground)
  await campground.save()
  res.redirect(`/campgrounds`)
})

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

app.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground })
})

app.put('/campgrounds/:id', async (req, res) => {
  l(req.body.campground)

  const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground }, { runValidators: true, new: true })
  res.redirect(`/campgrounds`)
  // res.redirect(`/campgrounds/${req.params.id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground })
})

app.delete('/campgrounds/:id', async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id)
  res.redirect('/campgrounds')
})

app.listen(3000, () => {
  l('listening on port 3000')
})

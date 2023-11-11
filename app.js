require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')



mongoose
  .connect('mongodb://127.0.0.1:27017/wolf-camp', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))






app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})


app.get('/campgrounds', async(req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id)

  res.render('campgrounds/show', { campground })
})

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})


app.listen(3000, () => {
  l('listening on port 3000')
})


require('../wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('../models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review')
const campgrounds = require('../routes/campgrounds')
const reviews = require('../routes/reviews')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('wolf')
})





module.exports = router;
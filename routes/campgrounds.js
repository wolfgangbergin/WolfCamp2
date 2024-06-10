
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
const router = express.Router();


router.get(
  '/',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    if (!campgrounds) {
      throw new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515)
    }
    res.render('campgrounds/index', { campgrounds })
  })
)





module.exports = router;
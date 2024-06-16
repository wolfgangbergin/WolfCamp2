globalThis.express = require('express')
globalThis.router = express.Router()
globalThis.ExpressError = require('./utils/ExpressError')
globalThis.l = console.log
globalThis.d = console.dir
globalThis.Joi = require('joi')
globalThis.mongoose = require('mongoose')
globalThis.Campground = require('./models/campground')
globalThis.cities = require('./seeds/cities')
globalThis.Schema = mongoose.Schema;







const { validateReview, validateCampground } = require('./utils/campgroundSchema')

globalThis.validateRevieww = validateReview
globalThis.validateCampground = validateCampground




globalThis.app = express()
globalThis.path = require('path')
globalThis.mongoose = require('mongoose')
globalThis.Campground = require('./models/campground')
globalThis.methodOverride = require('method-override')
globalThis.ejsMate = require('ejs-mate')
globalThis.ExpressError = require('./utils/ExpressError')
globalThis.test3 = require('./utils/ExpressError')
globalThis.catchAsync = require('./utils/catchAsync')
globalThis.Review = require('./models/review')
globalThis.campgrounds = require('./routes/campgrounds')
globalThis.reviews = require('./routes/reviews')
globalThis.home = require('./routes/home')


globalThis.wolfgang = {}


exports

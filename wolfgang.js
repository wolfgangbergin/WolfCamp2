globalThis.express = require('express')
globalThis.router = express.Router()
globalThis.home = require('./routes/home')
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



globalThis.home = require('./routes/home')
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


globalThis.passport = require('passport')
globalThis.LocalStrategy = require('passport-local')
globalThis.passportLocalMongoose = require('passport-local-mongoose')
globalThis.session = require('express-session')
globalThis.flash = require('connect-flash')
globalThis.User = require('./models/user')
globalThis.sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }
  
globalThis.userRoutes = require('./routes/users')
globalThis.campgroundRoutes = require('./routes/campgrounds')
globalThis.reviewRoutes = require('./routes/reviews')

Object.prototype.wolfman313 = () => {
    console.log('wolfman313')
 

}

globalThis.wolfgang = {}


exports

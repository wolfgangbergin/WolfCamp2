if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

globalThis.catchAsync = require('./utils/catchAsync')

globalThis.multer = require('multer')

globalThis.cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

globalThis.storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'WolfCamp',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
})

globalThis.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl

    wolfgang.returnTo = req.originalUrl

    req.flash('error', 'You must be signed in')
    return res.redirect('/user/login')
  }
  next()
}

globalThis.upload = multer({ storage: storage })

// globalThis.upload = multer({ dest: 'uploads/' })

globalThis.isOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that')
    return res.redirect(`/campgrounds/${id}`)
  }
  next()
})
globalThis.usersController = require('./controllers/usersController')

globalThis.isReviewOwner = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params
  const review = await Review.findById(reviewId)

  if (!review.author.equals(req.user?._id)) {
    req.flash('error', 'You do not have permission to do that')
    return res.redirect(`/user/login`)
  }
  next()
})
globalThis.usersController = require('./controllers/usersController')
globalThis.campgroundsController = require('./controllers/campgroundsController')
globalThis.reviewsController = require('./controllers/reviewsController')

// globalThis.storeReturnTo = (req, res, next) => {

//   if (req.session.returnTo) {
//     res.locals.returnTo = req.session.returnTo
//   }
//   next()
// }

globalThis.express = require('express')
globalThis.router = express.Router()
globalThis.home = require('./routes/home')
globalThis.ExpressError = require('./utils/ExpressError')
globalThis.l = console.log
globalThis.d = console.dir
globalThis.Joi = require('joi')
globalThis.mongoose = require('mongoose')

globalThis.cities = require('./seeds/cities')
globalThis.Schema = mongoose.Schema

const {
  validateReview,
  validateCampground,
} = require('./utils/campgroundSchema')

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
const seedDB = require('./seeds/index.js')


globalThis.seedDB = seedDB
globalThis.wolfgang = {
  mbxGeocoding: require('@mapbox/mapbox-sdk/services/geocoding'),
  //mapBoxToken: process.env.MAPBOX_TOKEN,
  

  kim: () => {},

  autologin: async (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      const devUserEmail = 'wolfgang@wolfgang.com'
      const user = await User.findOne({ email: devUserEmail })

      if (!user) {
        console.error('Dev user not found!')
        return
      }
      passport.use(
        new (require('passport-custom'))((req, done) => {
          done(null, user)
        })
      )
      req.login(user, (err) => {
        if (err) {
          return next(err)
        }
        console.log('autologin')
        req.flash('success', 'Auto-logged in as developer user.')
        if (req.originalUrl === '/autologin') {
          res.redirect(res.locals.testArr[res.locals.testArr.length - 2])
          return
        }
        res.redirect(`${req.originalUrl}`)
      })
    }
  },
}

globalThis.geocoder = wolfgang.mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN}),
globalThis.MAPBOX_TOKEN = process.env.MAPBOX_TOKEN

exports

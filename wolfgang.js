globalThis.l = console.log
globalThis.d = console.dir

globalThis.express = require('express')
globalThis.app = express()
globalThis.path = require('path')
globalThis.mongoose = require('mongoose')
globalThis.Campground = require('./models/campground')
globalThis.methodOverride = require('method-override')
globalThis.ejsMate = require('ejs-mate')
globalThis.ExpressError = require('./utils/ExpressError')
globalThis.catchAsync = require('./utils/catchAsync')
globalThis.Review = require('./models/review')
globalThis.campgrounds = require('./routes/campgrounds')
globalThis.reviews = require('./routes/reviews')
globalThis.wolf = require('./routes/wolf')
//globalThis.router = express.Router()

globalThis.wolfgang = {
    routerr: express.Router(),
}

exports

require('./wolfgang')


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
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
 res.locals.returnTo = req.session.returnTo
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})


app.use('/user', userRoutes)
app.use('/home', home)

app.use('/campgrounds', campgroundRoutes)
app.use('/reviews', reviewRoutes)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found🥜🥜', 404))
})

app.use((err, req, res, next) => {
  !err.message && (err.message = 'Something went wrong')
  !err.statusCode && (err.statusCode = 515)
  res.status(err.statusCode).render('error', { err })
})

app.listen(3000, () => {
  l('listening on port 3000')
})

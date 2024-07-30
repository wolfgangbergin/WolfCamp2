

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




const devUserEmail = 'bergin@bergin.com';


const tempUser = User.findOne({ email: devUserEmail })


app.get('/autologin', async(req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const devUserEmail = 'bergin@bergin.com'
    const tempUser  = await User.findOne({ email: devUserEmail })
    console.log('tempUser', tempUser)
    if (!tempUser) {
      console.error('Dev user not found!')
      return
    }
    passport.use(
      new (require('passport-custom'))((req, done) => {
        done(null, tempUser)
      })
    )
    req.login(tempUser, (err) => {
      if (err) {
        return next(err);
      }
      console.log('Auto-logged in as developer user.');
      res.redirect('/campgrounds')
    });
   
  }
  
}
)



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
  
  // wolfgang.kim()
  l('listening on port 3000')
})


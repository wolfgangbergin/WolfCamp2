router.get('/register', (req, res) => {
  res.render('users/register')
})

router.post(
  '/register',
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body
      const user = new User({ email, username })
      const registeredUser = await User.register(user, password)
      req.login(registeredUser, (err) => {
        if (err) return next(err)
        req.flash('success', 'Welcome to Wolf Camp!')
        res.redirect('/campgrounds')
      })
    } catch (e) {
      req.flash('error', e.message)

      res.redirect('/wolfman/register')
    }
  })
)

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/wolfman/login',
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!')
    l(req.session.returnTo)


    

    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
  }
)

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')
  })
})

module.exports = router

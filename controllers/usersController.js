const user_register = (req, res) => {
  res.render('users/register')
}

const user_register_post = catchAsync(async (req, res) => {
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

    res.redirect('/user/register')
  }
})

const user_login = (req, res) => {
  res.render('users/login')
}

const user_login_post = (req, res) => {
  req.flash('success', 'Welcome back!')

  const redirectUrl = res.locals.returnTo || '/campgrounds'

//   res.redirect(wolfgang.returnTo)
  res.redirect(redirectUrl)
}

const user_logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')
  })
}


module.exports = {
  user_login,
  user_logout,
  user_register,
  user_register_post,
  user_login_post,
}


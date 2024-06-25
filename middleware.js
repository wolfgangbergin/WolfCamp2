const isLoggedIn = (req, res, next) => {
if (!req.isAuthenticated()) {
    req.flash('error', 'You must be signed in')
    return res.redirect('/wolfman/login')
  }
    next()
}

module.exports = isLoggedIn

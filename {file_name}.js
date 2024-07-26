passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })(req, res, next);
if (process.env.NODE_ENV === 'development') {\n  req.login(user, function(err) {\n    if (err) { return next(err); }\n    return res.redirect('/');\n  });\n}

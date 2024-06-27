router.get('/register', usersController.user_register)

router.post('/register', usersController.user_register_post)

router.get('/login', usersController.user_login)

router.post(
  '/login',

  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/user/login',
  }),
  usersController.user_login_post
)

router.get('/logout', usersController.user_logout)

module.exports = router

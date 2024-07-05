router
  .route('/register')
  .get(usersController.user_register)
  .post(usersController.user_register_post)

router
  .route('/login')

  .get(usersController.user_login)

  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/user/login',
    }),
    usersController.user_login_post
  )

router.get('/logout', usersController.user_logout)

module.exports = router

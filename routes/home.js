



router.get('/wolf', (req, res) => {
  //seedDB()
  res.render('campgrounds/wolf')
})


router.get('/seed', async(req, res) => {
  await seedDB()
  res.redirect('/campgrounds')
  //res.render('campgrounds/index', { campgrounds })
})




module.exports = router

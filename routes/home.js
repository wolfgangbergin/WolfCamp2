



router.get('/wolf', (req, res) => {
  seedDB()
  res.render('campgrounds/wolf')
})

module.exports = router

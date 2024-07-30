
// Function to serialize and deserialize user (standard setup)
passport.serializeUser((user, done) => {
  l('user', user)
  done(null, user.id);
});



passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});




// Development auto-login setup
if (process.env.NODE_ENV === 'development') {
  const devUserEmail = 'bergin@bergin.com'; // Replace with a real developer email

  User.findOne({ email: devUserEmail }).then(( user, err) => {
    

    if (err) {
      console.error('Error fetching dev user:', err);
      return;
    }
    if (!user) {
      console.error('Dev user not found!');
      return;
    }

    // Automatically log in the developer user
    passport.use(
      new (require('passport-custom'))((req, done) => {
        done(null, user);
      })
    );
   
    // Auto-login middleware
    function autoLoginMiddleware(req, res, next) {
      console.log('kombo3133333333', req, user)
      if (!req.isAuthenticated()) {
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log('Auto-logged in as developer user.');
          return next();
        });
      } else {
        return next();
      }
    }

    // Use auto-login middleware in your app
    // app.use(autoLoginMiddleware());
  });
}

exports
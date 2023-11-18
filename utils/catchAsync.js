const ExpressError = require('./ExpressError')

const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (e) {
      next(new ExpressError('BAD Wolfie!!! 💩💩💩💩', 515))
    }
  }
}

module.exports = catchAsync;
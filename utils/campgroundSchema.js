const Joi = require('joi')
const ExpressError = require('./ExpressError')

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
})

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (!error) return next()
  const msg = error.details.map((el) => el.message).join(',')
  throw new ExpressError(msg, 400)
}
module.exports = validateCampground

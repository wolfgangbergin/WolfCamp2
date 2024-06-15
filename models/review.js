

const reviewSchema = new Schema({
    body: String,
    rating: {type: Number, min: 1, max: 5, default: 5},

});


module.exports = mongoose.model('Review', reviewSchema);

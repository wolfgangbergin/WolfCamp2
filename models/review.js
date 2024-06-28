

const reviewSchema = new Schema({
    body: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Review', reviewSchema);

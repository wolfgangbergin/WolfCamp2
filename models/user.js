const userScama = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        // unique: true
    }
})
userScama.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userScama)


const { places, descriptors } = require('./seedHelpers')

// mongoose
//   .connect('mongodb://127.0.0.1:27017/wolf-camp', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
//   .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

const seedDB = async () => {
 //await Campground.deleteMany({})
  for (let i = 0; i < 1; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '667c3a6e707815b367a8e190',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
      price,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum? Quod, voluptatibus. Quibusdam, quae. Quod, quidem. Quaerat, quae. Quisquam, voluptatum? Quod, voluptatibus. Quibusdam, quae. Quod, quidem. Quaerat, quae.',
      //image: 'https://www.desmoinesregister.com/gcdn/-mm-/a3bf82da6e654f6ea9c4df986dbf0437dc9f9c72/c=0-125-2762-1685/local/-/media/2015/02/23/IAGroup/DesMoines/635603064337329282-des.M0223FDFire009.JPG?width=700&height=396&fit=crop&format=pjpg&auto=webp',
      wolfman: 'wolfman',
      images:  [
        {
          url: 'https://res.cloudinary.com/dyjjrdmhi/image/upload/v1722181654/WolfCamp/f5gjpulkkhy930hvuar9.jpg',
          filename: 'WolfCamp/f5gjpulkkhy930hvuar9',
         
        },
     
      ],
    })
    await camp.save()
  }
}

// seedDB().then(() => {
//   mongoose.connection.close()
// })


//wolf

module.exports = seedDB


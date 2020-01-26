const mongoose = require('mongoose')
const connectionURL = 'mongodb://localhost/searchEngine'
require('./mongoose')

mongoose.connect(connectionURL, {
    // user: "admin",
    // pass: "kratos.admin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('Error', console.error.bind(console, "MongoDB connection Error"))
db.once('open', function (callback) {
    console.log('Successfully connected to MongoDB!')
})

// User.migrateToA(function (err) {
//     if(err) {
//         throw err
//     }

//     console.log('Migration successful!')
// })
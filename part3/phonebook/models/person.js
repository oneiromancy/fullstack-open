const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// mongoose DB connection
const url = process.env.MONGODB_URI
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

mongoose.set('useFindAndModify', false)

const PersonSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now },
        name: { type: String, minlength: 3, unique: true, required: true },
        number: { type: String, minlength: 8, required: true },
    },
    { collection: 'persons' }
)

PersonSchema.set('toJSON', {
    transform: function (doc, obj) {
        obj.id = obj._id
        delete obj._id
        delete obj.__v
    },
})

PersonSchema.plugin(uniqueValidator)
const Person = mongoose.model('Person', PersonSchema)

module.exports = Person

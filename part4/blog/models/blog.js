const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            text: String,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

blogSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    },
});

blogSchema.plugin(uniqueValidator);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

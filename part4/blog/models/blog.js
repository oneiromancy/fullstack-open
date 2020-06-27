const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

// mongoose DB connection
const url = config.MONGODB_URI;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

mongoose.set('useFindAndModify', false);

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

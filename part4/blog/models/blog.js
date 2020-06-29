const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

// mongoose DB connection
const url = config.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        logger.info('connected to MongoDB');
        mongoose.set('useFindAndModify', false);
    } catch (error) {
        logger.error('error connecting to MongoDB:', error.message);
    }
})();

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

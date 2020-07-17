const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');

// mongoose DB connection
(async () => {
    try {
        logger.info('connecting to database');

        await mongoose.connect(config.MONGODB_URI, {
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

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing');
    app.use('/api/testing', testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

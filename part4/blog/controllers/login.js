const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordValid =
        user && (await bcrypt.compare(password, user.passwordHash));

    if (!isPasswordValid) {
        return res.status(401).json({
            error: 'invalid username or password',
        });
    }

    const userToken = {
        username,
        id: user._id,
    };

    const token = await jwt.sign(userToken, process.env.SECRET);

    return res.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

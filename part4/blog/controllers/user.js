const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');

    return res.json(users.map((user) => user.toJSON()));
});

userRouter.post('/', async (req, res) => {
    const { name, username, password } = req.body;

    if (password.length < 3 || username.length < 3) {
        return res.status(400).json({
            error:
                'username and/or password must be at least 3 characters long',
        });
    }

    const SALT = 10;
    const passwordHash = await bcrypt.hash(password, SALT);

    const user = new User({ name, username, passwordHash });
    const savedUser = await user.save();

    return res.status(201).json(savedUser.toJSON());
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).populate('blogs');

    return res.json(user.toJSON());
});

module.exports = userRouter;

const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });

    return res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body;

    if (!title || !url) return res.status(400).end();

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, author, url, likes, user });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return res.status(201).json(savedBlog.toJSON());
});

blogRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('user');

    if (!blog) return res.status(404).end();

    res.json(blog.toJSON());
});

blogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ error: 'resource was not found' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return res.status(400).json({ error: 'unauthorized action' });
    }

    await Blog.findByIdAndRemove(id);

    return res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;
    const updatedValues = { likes };

    const blog = await Blog.findByIdAndUpdate(id, updatedValues, {
        new: true,
    });

    return res.json(blog.toJSON());
});

blogRouter.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const blog = await Blog.findByIdAndUpdate(
        id,
        { $push: { comments: { text: comment } } },
        { safe: true, upsert: true, new: true },
    );

    return res.json(blog.toJSON());
});

module.exports = blogRouter;

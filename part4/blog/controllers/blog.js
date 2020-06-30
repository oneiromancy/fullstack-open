const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});

    return res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body;

    if (!title || !url) return res.status(400).end();

    const blog = new Blog({ title, author, url, likes });
    await blog.save();

    return res.status(201).json(blog.toJSON());
});

blogRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).end();

    res.json(blog.toJSON());
});

blogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndRemove(id);

    return res.status(204).json(blog.toJSON());
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

module.exports = blogRouter;

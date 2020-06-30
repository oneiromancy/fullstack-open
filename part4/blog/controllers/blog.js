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

    return res.status(201).end();
});

blogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.deleteOne({ _id: id });

    return res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;
    const updatedValues = { likes };

    const blog = await Blog.findByIdAndUpdate(id, updatedValues, {
        new: true,
    });

    return res.json(blog);
});

module.exports = blogRouter;

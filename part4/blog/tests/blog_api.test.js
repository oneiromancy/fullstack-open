const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { initialBlogs } = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of initialBlogs) {
        const entry = new Blog(blog);
        await entry.save();
    }
});

describe('retrieving all blog posts', () => {
    test('returns the correct number of entries in JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('returns entries that have an id property (instead of _id)', async () => {
        const response = await api.get('/api/blogs');

        for (let blog of response.body) {
            expect(blog.id).toBeDefined();
        }
    });
});

describe('creating a blog post', () => {
    test('should increment the list of blogs by one', async () => {
        const newBlog = new Blog({
            title: 'React Redux Tutorial for Beginners',
            author: 'Robin Wieruch',
            url: 'https://www.robinwieruch.de/react-redux-tutorial',
            likes: 4,
        });

        await api.post('/api/blogs').send(newBlog).expect(201);

        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(initialBlogs.length + 1);
    });

    test('should make it searchable by title in list of blogs', async () => {
        const newBlog = new Blog({
            title: 'How to use React Memo',
            author: 'Robin Wieruch',
            url: 'https://www.robinwieruch.de/react-memo',
            likes: 4,
        });

        await api.post('/api/blogs').send(newBlog).expect(201);

        const response = await api.get('/api/blogs');
        const formattedResponse = response.body.map((blog) => {
            return blog.title;
        });

        expect(formattedResponse).toContain(newBlog.title);
    });

    test('should default likes to zero if input is omitted', async () => {
        const newBlog = new Blog({
            title: 'How to use React Testing Library Tutorial',
            author: 'Robin Wieruch',
            url: 'https://www.robinwieruch.de/react-testing-library',
        });

        await api.post('/api/blogs').send(newBlog).expect(201);

        const response = await api.get('/api/blogs');
        const lastEntry = response.body[response.body.length - 1];

        expect(lastEntry.likes).toEqual(0);
    });

    test('should fail with a 400 status code if either title or url inputs are omitted', async () => {
        const newBlog = new Blog({
            author: 'Robin Wieruch',
            likes: 12,
        });

        await api.post('/api/blogs').send(newBlog).expect(400);
    });
});

describe('deleting a blog post', () => {
    test('should succeed with a 204 status code', async () => {
        const blog = initialBlogs[initialBlogs.length - 1];

        await api.delete(`/api/blogs/${blog._id}`).expect(204);
    });
});

describe('updating a blog post', () => {
    test('by incrementing number of likes should return right number of likes', async () => {
        const blog = initialBlogs[initialBlogs.length - 1];
        blog.likes += 1;

        const response = await api.put(`/api/blogs/${blog._id}`).send(blog);

        expect(response.body.likes).toEqual(blog.likes);
    });
});

afterAll(() => {
    mongoose.connection.close();
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { initialBlogs, newBlog, users } = require('./test_helper');

const api = supertest(app);

const createUsers = async () => {
    for (let user of Object.values(users)) {
        // creating user
        await api.post('/api/users').send(user);
    }
};

const loginUsers = async () => {
    for (let user of Object.values(users)) {
        // obtaining jwt token
        const loginResponse = await api.post('/api/login').send(user);

        // storing jwt token
        user.token = `Bearer ${loginResponse.body.token}`;
    }
};

beforeAll(async () => {
    // clearing out mongo collections
    await User.deleteMany({});
    await Blog.deleteMany({});

    // setting up users to gain access to valid jwt tokens
    await createUsers();
    await loginUsers();
});

beforeEach(async () => {
    // reverting blogs to initial state following each test run
    await Blog.deleteMany({});

    for (blog of initialBlogs) {
        await api
            .post('/api/blogs')
            // admin is the owner of all blog posts
            // later on a guest user will attempt to modify his resources
            .set('Authorization', users.admin.token)
            .send(blog);
    }
});

describe('get all blog posts', () => {
    test('number of blog posts and response type (e.g: JSON)', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('id property exists', async () => {
        const response = await api.get('/api/blogs');

        for (let blog of response.body) {
            expect(blog.id).toBeDefined();
        }
    });
});

describe('create a blog post', () => {
    test('length of blog list is incremented by one', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlog)
            .expect(201);

        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(initialBlogs.length + 1);
    });

    test('blog post is in the blog list', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlog)
            .expect(201);

        const response = await api.get('/api/blogs');
        const formattedResponse = response.body.map((blog) => {
            return blog.title;
        });

        expect(formattedResponse).toContain(newBlog.title);
    });

    test('401 status code for missing/invalid jwt token', async () => {
        // jwt token not attached to header
        await api.post('/api/blogs').send(newBlog).expect(401);
    });

    test('likes of new blog post defaults to zero if field is omitted', async () => {
        const newBlogWithoutLikes = { ...newBlog };

        // removing likes property
        delete newBlogWithoutLikes.likes;

        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlogWithoutLikes)
            .expect(201);

        expect(postResponse.body.likes).toEqual(0);
    });

    test('400 status code for omitted title/url fields', async () => {
        const invalidNewBlog = { ...newBlog };

        // removing required title and url properties
        delete invalidNewBlog.title;
        delete invalidNewBlog.title;

        await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(invalidNewBlog)
            .expect(400);
    });
});

describe('delete a blog post', () => {
    test('204 status code for the owner of resource', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlog);

        await api
            .delete(`/api/blogs/${postResponse.body.id}`)
            .set('Authorization', users.admin.token)
            .expect(204);
    });

    test('400 status code for someone who is not the owner of the resource', async () => {
        const postResponse = await api
            .post('/api/blogs')
            // admin is the owner of the entry
            .set('Authorization', users.admin.token)
            .send(newBlog);

        await api
            .delete(`/api/blogs/${postResponse.body.id}`)
            // guest user attempts to delete an entry that is not his
            .set('Authorization', users.guest.token)
            .expect(400);
    });

    test('401 status code for an invalid/missing JWT token', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlog);

        // missing jwt token in header
        await api.delete(`/api/blogs/${postResponse.body.id}`).expect(401);
    });
});

describe('update a blog post', () => {
    test('number of likes is incremented by one', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', users.admin.token)
            .send(newBlog);

        const recentlyCreatedBlog = { ...postResponse.body };
        recentlyCreatedBlog.likes += 1;

        const putResponse = await api
            .put(`/api/blogs/${recentlyCreatedBlog.id}`)
            .set('Authorization', users.admin.token)
            .send(recentlyCreatedBlog);

        expect(putResponse.body.likes).toEqual(postResponse.body.likes + 1);
    });
});

afterAll(async () => {
    mongoose.connection.close();
});

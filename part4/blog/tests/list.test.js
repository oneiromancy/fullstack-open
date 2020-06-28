const listHelper = require('../utils/list_helper');
const blogs = require('./mockData');

describe('testing jest functionality with a dummy function', () => {
    test('dummy returns one', () => {
        const blogs = [];

        const result = listHelper.dummy(blogs);
        expect(result).toBe(1);
    });
});

describe('total likes', () => {
    test('of an empty list is zero', () => {
        const emptyList = [];

        const result = listHelper.totalLikes(emptyList);
        expect(result).toBe(0);
    });

    test('of a single-unit collection equals the # of likes of the only blog post contained within it', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url:
                    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0,
            },
        ];

        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(36);
    });
});

describe('favourite blog', () => {
    test('the blog post with the highest # of likes is Canonical string reduction', () => {
        const favouriteBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        };

        const result = listHelper.favouriteBlog(blogs);
        expect(result).toEqual(favouriteBlog);
    });
});

describe('most prolific author', () => {
    test(`Robert C. Martin is the most prolific author`, () => {
        const mostProlificAuthor = { author: 'Robert C. Martin', blogs: 3 };

        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual(mostProlificAuthor);
    });
});

describe('most liked author', () => {
    test(`Edsger W. Dijkstra is the most liked author`, () => {
        const mostLikedAuthor = { author: 'Edsger W. Dijkstra', likes: 17 };

        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual(mostLikedAuthor);
    });
});

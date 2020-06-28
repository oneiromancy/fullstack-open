const helpers = (() => {
    const isArrayEmpty = (arr) => {
        return !Array.isArray(arr) || !arr.length;
    };

    const groupByAuthor = (blogs) => {
        const authors = {};

        blogs.map((entry) => {
            const { author, ...blog } = entry;

            if (!authors[author]) {
                authors[author] = {
                    blogs: [],
                    blogCount: 0,
                    likeCount: 0,
                };
            }

            authors[author]['blogs'].push(blog);
            authors[author]['blogCount'] += 1;
            authors[author]['likeCount'] += blog.likes;
        });

        return authors;
    };

    return { isArrayEmpty, groupByAuthor };
})();

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (helpers.isArrayEmpty(blogs)) return 0;

    return blogs.reduce((prev, curr) => {
        return prev + curr.likes;
    }, 0);
};

const favouriteBlog = (blogs) => {
    if (helpers.isArrayEmpty(blogs)) return;

    return blogs
        .map((blog) => {
            return {
                author: blog.author,
                title: blog.title,
                likes: blog.likes,
            };
        })
        .reduce((prev, curr) => {
            return prev.likes > curr.likes ? prev : curr;
        });
};

const mostBlogs = (blogs) => {
    if (helpers.isArrayEmpty(blogs)) return;

    const authors = helpers.groupByAuthor(blogs);

    return Object.keys(authors)
        .map((author) => {
            return { author, blogs: authors[author].blogCount };
        })
        .reduce((prev, curr) => {
            return prev.blogs > curr.blogs ? prev : curr;
        });
};

const mostLikes = (blogs) => {
    if (helpers.isArrayEmpty(blogs)) return;

    const authors = helpers.groupByAuthor(blogs);

    return Object.keys(authors)
        .map((author) => {
            return { author, likes: authors[author].likeCount };
        })
        .reduce((prev, curr) => {
            return prev.likes > curr.likes ? prev : curr;
        });
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
};

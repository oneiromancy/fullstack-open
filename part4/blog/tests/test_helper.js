const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
            'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
            'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
];

const users = {
    admin: {
        username: 'ricknmorty',
        name: 'Rick Sanchez',
        password: 'wubba_lubba_dub_dub',
    },
    guest: {
        username: 'guestuser',
        name: 'John Doe',
        password: 'qwerty',
    },
};

const newBlog = {
    title: 'React Redux Tutorial for Beginners',
    author: 'Robin Wieruch',
    url: 'https://www.robinwieruch.de/react-redux-tutorial',
    likes: 4,
};

module.exports = { initialBlogs, users, newBlog };

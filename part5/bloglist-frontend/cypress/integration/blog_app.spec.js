const user = {
    name: 'Rick Sanchez',
    username: 'tiny_rick',
    password: 'qwerty',
};

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
            'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
            'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
];

const newBlog = {
    title: 'React Redux Tutorial for Beginners',
    author: 'Robin Wieruch',
    url: 'https://www.robinwieruch.de/react-redux-tutorial',
    likes: 4,
};

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.insertUser(user);
        cy.visit('http://localhost:3000');
    });

    it('shows a Login form', function () {
        cy.contains('Login to application');
        cy.get('input#username');
        cy.get('input#password');
        cy.get('button#login-button');
    });

    describe('Login Form', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input#username').type(user.username);
            cy.get('input#password').type(user.password);
            cy.get('button#login-button').click();
            cy.contains(`${user.name} is logged in`);
        });

        it('fails with wrong credentials', function () {
            cy.get('input#username').type(user.username);
            cy.get('input#password').type(`invalidate ${user.password}`);
            cy.get('button#login-button').click();
            cy.contains('Wrong credentials');
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login(user);
            cy.insertBlog(initialBlogs);
        });

        it('a blog can be created', function () {
            cy.contains('new note').click();
            cy.get('input#title').type(newBlog.title);
            cy.get('input#author').type(newBlog.author);
            cy.get('input#url').type(newBlog.url);
            cy.get('button#create-blog-button').click();
            cy.contains(
                `${newBlog.title} by ${newBlog.author} has been added to the list of blogs`,
            );
        });

        it('a blog can be deleted', function () {
            cy.insertBlog(newBlog);
            cy.contains(newBlog.title).parent().contains('view').click();
            cy.contains(newBlog.title).parent().contains('remove').click();
            cy.contains(
                `${newBlog.title} by ${newBlog.author} has been successfully deleted from the list of blogs`,
            );
        });

        it('a blog can be liked', function () {
            cy.insertBlog(newBlog);

            cy.contains(newBlog.title).parent().contains('view').click();
            cy.contains(newBlog.title).parent().contains('like').click();
            cy.contains(newBlog.title)
                .parent()
                .contains(`Likes: ${Number(newBlog.likes) + 1}`);
        });

        it('list of blogs is sorted by likes', function () {
            let previousLikes;

            cy.get('.view-blog-button').then((btns) => {
                btns.map((_, btn) => {
                    const viewBlogBtn = cy.wrap(btn);

                    viewBlogBtn.click();

                    viewBlogBtn
                        .parent()
                        .contains('Likes: ')
                        .then((el) => {
                            // Search for the number of likes in component (i.e. <span>Likes: 12</span>)
                            const currentLikes = Number(
                                el[0].textContent.match(/\d+/)[0],
                            );

                            if (previousLikes === undefined) {
                                previousLikes = currentLikes;
                            } else {
                                // Blogs are sorted in descending order based on their number of likes
                                // Expect number of likes of blogs further down the list to be less than that of blogs at the top
                                expect(currentLikes).to.be.most(previousLikes);
                                previousLikes = currentLikes;
                            }
                        });
                });
            });
        });
    });
});

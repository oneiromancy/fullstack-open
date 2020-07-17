Cypress.Commands.add('login', ({ username, password }, shouldReturnToken) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username,
        password,
    }).then(({ body }) => {
        if (shouldReturnToken) {
            return body;
        }

        localStorage.setItem('user', JSON.stringify(body));
        cy.visit('http://localhost:3000');
    });
});

Cypress.Commands.add('insertUser', (newUsers) => {
    const users = Array.isArray(newUsers) ? newUsers : [newUsers];

    users.map((user) => {
        cy.request('POST', 'http://localhost:3001/api/users', user);
    });
});

Cypress.Commands.add('insertBlog', (newBlogs) => {
    const blogs = Array.isArray(newBlogs) ? newBlogs : [newBlogs];

    blogs.map((blog) => {
        cy.request({
            url: 'http://localhost:3001/api/blogs',
            method: 'POST',
            body: blog,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`,
            },
        });
    });

    cy.visit('http://localhost:3000');
});

Cypress.Commands.add('removeBlog', (id) => {
    cy.request({
        url: `http://localhost:3001/api/blogs/${id}`,
        method: 'DELETE',
        // failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
            }`,
        },
    });

    cy.visit('http://localhost:3000');
});

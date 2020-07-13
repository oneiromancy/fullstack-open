import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

const blog = {
    title: 'Doing Unit Testing on React components with @testing-library',
    author: 'Rick Sanchez',
    id: '535329290',
    url: 'nopath.com',
    likes: 0,
    user: {
        id: '3294281842',
        name: 'RS',
        username: 'rs_mortified',
    },
};

describe('unit testing <Blog/>', () => {
    test('title and author of blog post are rendered, but not url or likes', () => {
        const upvoteMockFn = jest.fn();
        const deleteMockFn = jest.fn();

        const component = render(
            <Blog
                blog={blog}
                handleBlogUpdate={upvoteMockFn}
                handleBlogDeletion={deleteMockFn}
            />,
        );

        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);

        expect(component.container).not.toHaveTextContent(blog.url);
        expect(component.container).not.toHaveTextContent(blog.likes);
    });

    test('url and likes of blog post are rendered after fullview mode is on', () => {
        const upvoteMockFn = jest.fn();
        const deleteMockFn = jest.fn();

        const component = render(
            <Blog
                blog={blog}
                handleBlogUpdate={upvoteMockFn}
                handleBlogDeletion={deleteMockFn}
            />,
        );

        const viewBtn = component.getByText('view');
        // console.log(prettyDOM());
        fireEvent.click(viewBtn);

        expect(component.container).toHaveTextContent(blog.url);
        expect(component.container).toHaveTextContent(blog.likes);
    });

    test('number of times like button is clicked', () => {
        const upvoteMockFn = jest.fn();
        const deleteMockFn = jest.fn();

        const component = render(
            <Blog
                blog={blog}
                handleBlogUpdate={upvoteMockFn}
                handleBlogDeletion={deleteMockFn}
            />,
        );

        const viewBtn = component.getByText('view');
        fireEvent.click(viewBtn);

        const likeBtn = component.getByText('like');
        fireEvent.click(likeBtn);
        fireEvent.click(likeBtn);

        expect(upvoteMockFn.mock.calls).toHaveLength(2);
    });
});

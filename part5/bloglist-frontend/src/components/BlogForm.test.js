import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('unit testing <BlogForm/>', () => {
    test('creation of a new blog post', () => {
        const createMockFn = jest.fn();

        const component = render(
            <BlogForm handleBlogCreation={createMockFn} />,
        );

        const form = component.container.querySelector('form');

        const title = screen.getByLabelText('title');
        const author = screen.getByLabelText('author');
        const url = screen.getByLabelText('url');

        fireEvent.change(title, {
            target: { value: '@Testing-Library' },
        });

        fireEvent.change(author, {
            target: { value: 'Rick Sanchez' },
        });

        fireEvent.change(url, {
            target: { value: 'nopath.com' },
        });

        fireEvent.submit(form);

        expect(createMockFn.mock.calls).toHaveLength(1);

        expect(createMockFn.mock.calls[0][0].title).toBe('@Testing-Library');
        expect(createMockFn.mock.calls[0][0].author).toBe('Rick Sanchez');
        expect(createMockFn.mock.calls[0][0].url).toBe('nopath.com');
    });
});

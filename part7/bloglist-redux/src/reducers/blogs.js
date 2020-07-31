import blogServices from '../services/blogs';
import { initiateTimedNotification } from './notifications';

export const getAllBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogServices.getAll();

        dispatch({
            type: 'GET_ALL_BLOGS',
            data: blogs,
        });
    };
};

export const getBlogById = (id) => {
    return async (dispatch) => {
        const blog = await blogServices.getOne(id);

        dispatch({
            type: 'GET_BLOG_BY_ID',
            data: blog,
        });
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogServices.createOne(blog);

            dispatch({
                type: 'CREATE_BLOG',
                data: newBlog,
            });
            dispatch(
                initiateTimedNotification(
                    `${newBlog.title} by ${newBlog.author} was created`,
                ),
            );
        } catch (e) {
            dispatch(
                initiateTimedNotification(
                    `${blog.title} by ${blog.author} could not be created`,
                ),
            );
        }
    };
};

export const createComment = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogServices.createComment(blog);

            dispatch({
                type: 'CREATE_COMMENT',
                data: updatedBlog,
            });
            dispatch(initiateTimedNotification(`Comment was created`));
        } catch (e) {
            dispatch(initiateTimedNotification(`Comment could not be created`));
        }
    };
};

export const upvoteBlog = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogServices.updateOne(blog);

            dispatch({
                type: 'UPVOTE_BLOG',
                data: updatedBlog,
            });

            dispatch(
                initiateTimedNotification(
                    `${updatedBlog.title} by ${updatedBlog.author} was upvoted`,
                ),
            );
        } catch (e) {
            dispatch(
                initiateTimedNotification(
                    `${blog.title} by ${blog.author} could not be upvoted`,
                ),
            );
        }
    };
};

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogServices.deleteOne(blog.id);

            dispatch({
                type: 'DELETE_BLOG',
                data: blog.id,
            });
            dispatch(
                initiateTimedNotification(
                    `${blog.title} by ${blog.author} was deleted`,
                ),
            );
        } catch (error) {
            dispatch(
                initiateTimedNotification(
                    `${blog.title} by ${blog.author} could not be deleted`,
                ),
            );
        }
    };
};

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_BLOGS':
            return action.data;
        case 'GET_BLOG_BY_ID':
            return state.concat(action.data);
        case 'CREATE_BLOG':
            return state.concat(action.data);
        case 'CREATE_COMMENT':
            return state.map((entry) =>
                entry.id === action.data.id ? action.data : entry,
            );
        case 'UPVOTE_BLOG':
            return state.map((entry) =>
                entry.id === action.data.id ? action.data : entry,
            );
        case 'DELETE_BLOG':
            return state.filter((entry) => entry.id !== action.data);
        default:
            return state;
    }
};

export default blogReducer;

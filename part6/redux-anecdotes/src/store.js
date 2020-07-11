import { createStore, combineReducers } from 'redux';
import anecdoteReducer from './reducers/anecdotes';
import notificationReducer from './reducers/notification';
import filterReducer from './reducers/filter';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;

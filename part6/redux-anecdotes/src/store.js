import { createStore, combineReducers, applyMiddleware } from 'redux';
import anecdoteReducer from './reducers/anecdote';
import notificationReducer from './reducers/notification';
import filterReducer from './reducers/filter';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

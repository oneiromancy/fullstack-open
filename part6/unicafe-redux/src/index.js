import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counterReducer from './reducers/counter';

const store = createStore(counterReducer);

function App() {
    const dispatchAction = (type) => {
        const action = { type };
        store.dispatch(action);
    };

    return (
        <div className="App">
            {Object.keys(store.getState()).map((feedbackType) => {
                const votes = store.getState()[feedbackType];

                return (
                    <div key={feedbackType}>{`${feedbackType}: ${votes}`}</div>
                );
            })}

            <button onClick={() => dispatchAction('GOOD')}>good</button>
            <button onClick={() => dispatchAction('OK')}>ok</button>
            <button onClick={() => dispatchAction('BAD')}>bad</button>
            <button onClick={() => dispatchAction('RESET')}>reset</button>
        </div>
    );
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

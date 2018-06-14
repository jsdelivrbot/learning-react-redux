import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import {Provider} from 'react-redux';
const rootReducer = combineReducers({
    ctr:counterReducer,
    res:resultReducer
});
//for devtool starts
const logger = store =>{
    return next =>{
        return action =>{
            console.log('[Middleware] dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
//for devtool ends
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
//npm install --save redux react-redux
//combineReducers literally combines all the reducers in diufferent directory in one global reducer
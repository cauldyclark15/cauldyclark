import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const configureStore = () => {
    return createStore(
        reducers,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        )
    )
}

export default configureStore;
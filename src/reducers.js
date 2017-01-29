import { combineReducers } from 'redux';

const customersFilter = (state = '', action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const posts = (state = {
    customers: [],
}, action) => {
    switch (action.type) {
        case 'RECEIVE_POSTS':
            return Object.assign({}, state, {
                customers: action.customers,
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    customersFilter,
    posts,
});

export default rootReducer;
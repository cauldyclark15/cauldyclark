import { combineReducers } from 'redux';

const customersFilter = (state = '', action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const storeContent = (state = {
    customers: [],
    products: [],
}, action) => {
    switch (action.type) {
        case 'RECEIVE_CUSTOMERS':
            return Object.assign({}, state, {
                customers: action.customers,
            });
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                products: action.products,
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    customersFilter,
    storeContent,
});

export default rootReducer;
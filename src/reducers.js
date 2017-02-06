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
    isFetching: false,
    receivedAll: false,
}, action) => {
    switch (action.type) {
        case 'REQUEST_STORE_INFO':
            return Object.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_CUSTOMERS':
            return Object.assign({}, state, {
                customers: action.customers,
                isFetching: state.products.length > 0 ? false : true,
            });
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                products: action.products,
                isFetching: state.customers.length > 0 ? false : true,
            })
        case 'RECEIVE_ALL':
            return Object.assign({}, state, {
                receivedAll: true,
            })
        default:
            return state;
    } 
}

const mapOfProductsToCustomer = (state = {
    custProdMap: [],
    showModal: false,
}, action) => {
    switch (action.type) {
        case 'MAP_CUSTOMER_PRODUCTS':
            return Object.assign({}, state, {
                custProdMap: [
                    ...state.custProdMap,
                    toObjectProducts(action.customer, action.products)
                ],
            });
        case 'SHOW_MODAL':
            return Object.assign({}, state, {
                showModal: true,
                servingCustomer: action.name,
            })
        case 'HIDE_MODAL':
            return Object.assign({}, state, {
                showModal: false,
            })
        default:
            return state;
    }
}

// helper functions

function toObjectProducts(customer, products) {
    let prodObj = {
        custName: customer,
        custProducts: [],
    };
    products.forEach(prod => {
        prodObj.custProducts.push({
            id: prod._id,
            name: prod.name,
            price: prod.price,
            qty: 0,
            total: 0,
            date: '',
        })
    });
    return prodObj;
}

const rootReducer = combineReducers({
    customersFilter,
    storeContent,
    mapOfProductsToCustomer,
});

export default rootReducer;
import fetch from 'isomorphic-fetch';

// SYNC
// setting filter
export const setCustomerFilter = (filter) => ({
    type: 'SET_CUSTOMER_FILTER',
    filter,
})

// map products with each customers
export const mapCustomerToProducts = (id, products) => ({
    type: 'MAP_CUSTOMER_PRODUCTS',
    id,
    products,
})

// toggle showmodal appearance status
export const appearModal = (id) => ({
    type: 'SHOW_MODAL',
    id,
})

export const hideModal = () => ({
    type: 'HIDE_MODAL',
})

// request storing received customers and products array
const requestCustAndProd = () => ({
    type: 'REQUEST_STORE_INFO',
})

const receiveCustomers = (customers) => ({
    type: 'RECEIVE_CUSTOMERS',
    customers,
})

const receiveProducts = (products) => ({
    type: 'RECEIVE_PRODUCTS',
    products,
})

const receiveAll = () => ({
    type: 'RECEIVE_ALL',
})

// increment and decrement product purchase counter

export const incrementProd = (id, product) => ({
    type: 'INCREMENT_PROD',
    id,
    product,
})

export const decrementProd = (id, product) => ({
    type: 'DECREMENT_PROD',
    id,
    product,
})

// save purchased products

export const computePurchased = (custProdMap, id) => ({
    type: 'COMPUTE_PURCHASED',
    custProdMap,
    id,
})

// ASYNC 
export const fetchCustomers = () => {
    return fetch('http://localhost:5000/customers.json')
        .then(response => {
            return response.json();
        })
        .then(customers => {
            return customers;
        });
}

export const fetchProducts = () => {
    return fetch('http://localhost:5000/products.json')
        .then(response => {
            return response.json();
        })
        .then(products => {
            return products;
        });
}

export const fetchCustomersAndProducts = (customers, products) => {
    return (dispatch) => {
        dispatch(requestCustAndProd());
        return Promise.all([customers, products])
            .then(values => {
                dispatch(receiveCustomers(values[0]));
                dispatch(receiveProducts(values[1]));
                dispatch(receiveAll());
                values[0].forEach(customer => {
                    dispatch(mapCustomerToProducts(customer._id, values[1]));
                })
            })
    }
}
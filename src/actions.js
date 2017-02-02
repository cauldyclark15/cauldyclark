import fetch from 'isomorphic-fetch';

// SYNC
// setting filter
export const setCustomerFilter = (filter) => ({
    type: 'SET_CUSTOMER_FILTER',
    filter,
});

// map products with each customers
export const mapCustomerToProducts = (customer) => ({
    type: 'MAP_CUSTOMER_PRODUCTS',
    customer,
})

// storing received customers and products array
export const receiveCustomers = (customers) => ({
    type: 'RECEIVE_CUSTOMERS',
    customers,
});

export const receiveProducts = (products) => ({
    type: 'RECEIVE_PRODUCTS',
    products,
});



// ASYNC 
export const fetchCustomers = () => {
    return (dispatch) => {
        return fetch('http://localhost:5000/customers.json')
            .then(response => {
                return response.json();
            })
            .then(json => {
                return dispatch(receiveCustomers(json));
            });
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        return fetch('http://localhost:5000/products.json')
            .then(response => {
                return response.json();
            })
            .then(json => {
                return dispatch(receiveProducts(json));
            });
    }
}
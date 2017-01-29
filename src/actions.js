import fetch from 'isomorphic-fetch';

// SYNC
export const setCustomerFilter = (filter) => ({
    type: 'SET_CUSTOMER_FILTER',
    filter,
});

export const receivePosts = (customers) => ({
  type: 'RECEIVE_POSTS',
  customers,
});

// ASYNC
export const fetchCustomers = () => {
    return (dispatch) => {
        return fetch('http://localhost:5000/customers.json')
            .then(response => {
                return response.json();
            })
            .then(json => {
                return dispatch(receivePosts(json));
            });
    }
}
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
        case 'COMPUTE_PURCHASED':
            return Object.assign({}, state, {
                customers: updateACustomer(state.customers, action.custProdMap, action.id)
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
                    toObjectProducts(action.id, action.products)
                ],
            });
        case 'SHOW_MODAL':
            return Object.assign({}, state, {
                showModal: true,
                servingCustomer: action.id,
            })
        case 'HIDE_MODAL':
            return Object.assign({}, state, {
                showModal: false,
            })
        case 'INCREMENT_PROD':
            return Object.assign({}, state, {
                custProdMap: addQty(state.custProdMap, action.id, action.product)
            })
        case 'DECREMENT_PROD':
            return Object.assign({}, state, {
                custProdMap: decQty(state.custProdMap, action.id, action.product)
            })
        default:
            return state;
    }
}

// helper functions
function updateACustomer(custArray, custProdArray, id) {
    let newCurrentBalance = 0;
    let purchasedProducts = [];
    let result = [];

    custProdArray.filter(custProd => {
        return custProd.custId === id;
    })[0].custProducts.forEach(product => {
        newCurrentBalance += (product.price * product.qty);
        purchasedProducts.push({
            id: product.id,
            date: new Date().toISOString(),
            qty: product.qty,
        });
    });
    
    custArray.forEach(customer => {
        if (customer._id !== id) {
            result.push(customer)
        } else {
            if (customer.purchased) {
                customer.purchased = [...customer.purchased, ...purchasedProducts];
            } else {
                customer.purchased = purchasedProducts;
            }
            customer.curr_balance = newCurrentBalance;
            result.push(customer);
        }
    });

    return result;
}

function addQty(cpMap, custId, prodName) {
    let result = [];
    cpMap.forEach(customer => {
        if (customer.custId !== custId) {
            result.push(customer);
        } else {
            customer.custProducts.forEach(product => {
                if (product.name === prodName) {
                    product.qty += 1;
                }
            })
            result.push(customer);
        }
    });
    return result;
}

function decQty(cpMap, custId, prodName) {
    let result = [];
    cpMap.forEach(customer => {
        if (customer.custId !== custId) {
            result.push(customer);
        } else {
            customer.custProducts.forEach(product => {
                if (product.name === prodName && product.qty > 0) {
                    product.qty -= 1;
                }
            })
            result.push(customer);
        }
    });
    return result;
}

function toObjectProducts(id, products) {
    let prodObj = {
        custId: id,
        custProducts: [],
    };
    products.forEach(prod => {
        prodObj.custProducts.push({
            id: prod._id,
            name: prod.name,
            price: prod.price,
            qty: 0,
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
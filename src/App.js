import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch';
import './App.css';

// actions creators ------------------------------------------------------------------------
/* SYNC */
//const requestPosts = () => ({
//  type: 'REQUEST_POSTS',
//});

const receivePosts = (customers) => ({
  type: 'RECEIVE_POSTS',
  customers,
});
/* ASYNC */
const fetchCustomers = () => {
  return (dispatch) => {
    return fetch('http://localhost:1515/customers.json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        return dispatch(receivePosts(json));
      })
  }
}
// actions creators ------------------------------------------------------------------------

// reducers --------------------------------------------------------------------------------
const posts = (state = {
  customers: [],
}, action) => {
  if (action.type === 'RECEIVE_POSTS') {
    return Object.assign({}, state, {
      customers: action.customers
    });
  }
  return state;
}
const rootReducer = combineReducers({
  posts
});
// reducers --------------------------------------------------------------------------------

// configureStore --------------------------------------------------------------------------
const loggerMiddleware = createLogger();

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    )
  );
};

// configureStore --------------------------------------------------------------------------

// container async -------------------------------------------------------------------------
class App extends Component {
  componentDidMount() {
    const { dispatch, customers } = this.props;
    dispatch(fetchCustomers(customers));
  }
  render() {
    const { customers } = this.props;
    return (
      <div>
        <h1>customers</h1>
        <ul>
          {customers.map(customer => {
            return <li key={customer._id}>{customer.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.posts.customers,
});

const Customers = connect(mapStateToProps)(App);
// container async -------------------------------------------------------------------------

// root provide ----------------------------------------------------------------------------
const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Customers />
      </Provider>
    )
  }
}
// root provide ----------------------------------------------------------------------------

export default Root;
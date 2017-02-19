import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Root from './components/Root';
import AsyncCustomers from './components/customers/AsyncCustomers';
import configureStore from './configureStore';
import './App.css';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Root}>
                        <Route path="customers" component={AsyncCustomers}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

export default App;
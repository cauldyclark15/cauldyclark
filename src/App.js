import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';
import configureStore from './configureStore';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App;
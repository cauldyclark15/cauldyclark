import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';

class Root extends Component {
    render() {
        return (
            <div>
                <Header pusher={this.props.router.push}/>
                {this.props.children}
            </div>
        );
    }
}

export default connect()(Root);
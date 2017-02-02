import React, { PropTypes, Component } from 'react';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';

class ProductCounter extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="counterBoard">
                <Panel header={name}></Panel>
            </div>
        )
    }
}
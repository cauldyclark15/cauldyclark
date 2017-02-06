import React, { PropTypes, Component } from 'react';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';

class ProductCounter extends Component {
    render() {
        const { name, qty } = this.props;
        return (
            <div className="counterBoard">
                <Panel className="counterPanel" header={name}>
                    {qty}
                </Panel>
                <ButtonGroup>
                    <Button>+</Button>
                    <Button>-</Button>
                </ButtonGroup>
            </div>
        )
    }
}

ProductCounter.propTypes = {
    name: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
}

export default ProductCounter;
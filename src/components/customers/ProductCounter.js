import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import { incrementProd, decrementProd } from '../../actions/actions';

class ProductCounter extends Component {
    render() {
        const { prodName, qty, dispatch, custName } = this.props;
        return (
            <div className="counterBoard">
                <h3>{prodName}</h3>
                <h2>{qty}</h2>
                <ButtonGroup>
                    <Button bsSize="large" bsStyle="primary" onClick={() => {
                        dispatch(incrementProd(custName, prodName));
                    }}>+</Button>
                    <Button bsSize="large" bsStyle="warning" onClick={() => {
                        dispatch(decrementProd(custName, prodName));
                    }}>-</Button>
                </ButtonGroup>
            </div>
        )
    }
}

ProductCounter.propTypes = {
    custName: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
}

export default ProductCounter;
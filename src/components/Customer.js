import React, { PropTypes, Component } from 'react';

class Customer extends Component {
    render() {
        const { onClick, name, occupation, curr_balance } = this.props;
        return (
            <button className="customer" onClick={onClick}>
                <div className="data">
                    <div>{name}</div>
                    <div>{occupation}</div>
                    <div>{curr_balance}</div>               
                </div>
            </button>
        )
    }
    
}

/*
class Customer extends Component {
    render() {
        
    }
}
*/

Customer.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    curr_balance: PropTypes.number.isRequired,
}

export default Customer;
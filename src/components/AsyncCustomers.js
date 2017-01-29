import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCustomers } from '../actions';
import Customer from './Customer';

class AsyncCustomers extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomers());
    }
    render() {
        const { customers } = this.props;
        return (
            <div className="customersBox">
                {customers.map(customer => {
                    return <Customer
                            key={customer._id}
                            name={customer.name}
                            occupation={customer.occupation}
                            curr_balance={customer.curr_balance}
                            onClick={() => {
                                console.log('hello node')
                            }} />
                })}
            </div>
        )
    }
}

AsyncCustomers.propTypes = {
    customers: PropTypes.array.isRequired,
}

function getVisibleCustomers(customers, filter) {
    let re = new RegExp('^' + filter);
    return customers.filter(customer => {
        return re.test(customer.name);
    })
}

const mapStateToProps = (state) => ({
    customers: getVisibleCustomers(state.posts.customers, state.customersFilter)
});

export default connect(
    mapStateToProps
)(AsyncCustomers);
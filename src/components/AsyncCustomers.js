import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCustomers, fetchProducts, fetchCustomersAndProducts, hideModal, appearModal } from '../actions';
import ProductCounter from './ProductPurchaseCounter';

class AsyncCustomers extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomersAndProducts(fetchCustomers(), fetchProducts()));
    }
    render() {
        const { customers, dispatch, productMap, isFetching, receivedAll } = this.props;
        return (
            
            <div className="customersBox">
                {isFetching && productMap.custProdMap.length === 0 && <h2>Loading . . .</h2>}
                {customers.map(customer => {
                    return <div
                        key={customer._id}
                        className="customers" 
                    >
                        <Button onClick={() => {
                            dispatch(appearModal(customer.name));
                        }}>
                            <h1>{customer.name}</h1>
                            <h3>{customer.position}</h3>
                            <h1>{customer.curr_balance}</h1>
                        </Button>
                    </div>
                })}
                
                {receivedAll && productMap.servingCustomer && <Modal show={productMap.showModal} onHide={() => {
                    dispatch(hideModal());
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{productMap.servingCustomer}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {productMap.custProdMap.filter(cust => {
                            return (cust.custName === productMap.servingCustomer)
                        })[0].custProducts.map(custProd => {
                            return <ProductCounter
                                key={custProd.id}
                                name={custProd.name}
                                qty={custProd.qty}
                            />
                        })}
                    </Modal.Body>
                </Modal>}
            </div>
        )
    }
}

AsyncCustomers.propTypes = {
    customers: PropTypes.array.isRequired,
}

function getVisibleCustomers(customers, filter) {
    let filterLower = filter.toLowerCase();
    let re = new RegExp('^' + filterLower);
    return customers.filter(customer => {
        return re.test(customer.name.toLowerCase());
    })
}

const mapStateToProps = (state) => ({
    customers: getVisibleCustomers(state.storeContent.customers, state.customersFilter),
    products: state.storeContent.products,
    isFetching: state.storeContent.isFetching,
    receivedAll: state.storeContent.receivedAll,
    productMap: state.mapOfProductsToCustomer,
});

export default connect(
    mapStateToProps
)(AsyncCustomers);
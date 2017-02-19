import React, { Component, PropTypes } from 'react';
import { Button, Modal, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCustomers, fetchProducts, fetchCustomersAndProducts, hideModal, appearModal, computePurchased } from '../../actions/actions';
import ProductCounter from './ProductCounter';
import SearchCustomer from './SearchCustomer';

class AsyncCustomers extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomersAndProducts(fetchCustomers(), fetchProducts()));
    }
    render() {
        const { customers, dispatch, productMap, isFetching, receivedAll, activeCust} = this.props;
        return (
            <div className="cust_bg">
                <SearchCustomer />
                {isFetching && productMap.custProdMap.length === 0 && <h2>Loading . . .</h2>}
                {customers.map(customer => {
                    return (
                        <Button
                            key={customer._id}
                            className="customers" 
                            onClick={() => {
                            dispatch(appearModal(customer._id));
                        }}>
                            <h3>{customer.name}</h3>
                            <h4>{customer.position}</h4>
                            <h3>{customer.curr_balance}</h3>
                        </Button>
                    )
                })}
                
                {receivedAll && productMap.servingCustomer && <Modal bsSize="large" show={productMap.showModal} onHide={() => {
                    dispatch(hideModal());
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title componentClass="h2" >{activeCust}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {productMap.custProdMap.filter(cust => {
                            return (cust.custId === productMap.servingCustomer)
                        })[0].custProducts.map(custProd => {
                            return <ProductCounter
                                key={custProd.id}
                                prodName={custProd.name}
                                qty={custProd.qty}
                                dispatch={dispatch}
                                custName={productMap.servingCustomer}
                            />
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => {
                            dispatch(computePurchased(productMap.custProdMap, productMap.servingCustomer));
                            dispatch(hideModal());
                        }}>Save</Button>
                    </Modal.Footer>
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

function getName(customers, id) {
    let result = customers.filter(customer => {
        return customer._id === id;
    });
    return result[0].name;
}

const mapStateToProps = (state) => ({
    customers: getVisibleCustomers(state.storeContent.customers, state.customersFilter),
    products: state.storeContent.products,
    isFetching: state.storeContent.isFetching,
    receivedAll: state.storeContent.receivedAll,
    productMap: state.mapOfProductsToCustomer,
    activeCust: state.mapOfProductsToCustomer.servingCustomer ? getName(state.storeContent.customers, state.mapOfProductsToCustomer.servingCustomer) : "Please wait"
});

export default connect(
    mapStateToProps
)(AsyncCustomers);
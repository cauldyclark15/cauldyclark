import React, { PropTypes, Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { hideModal, appearModal } from '../actions';

class Customer extends Component {
    render() {
        const { name, occupation, curr_balance, showModal, dispatch } = this.props;
        return (
            <div>
                <Button onClick={() => {
                    dispatch(appearModal());
                }}>
                    <h1>{name}</h1>
                    <h3>{occupation}</h3>
                    <h1>{curr_balance}</h1>
                </Button>
                <Modal show={showModal} onHide={() => {
                    dispatch(hideModal());
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}

Customer.propTypes = {
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    curr_balance: PropTypes.number.isRequired,
    showModal: PropTypes.bool.isRequired,
}

export default Customer;
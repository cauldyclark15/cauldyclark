import React from 'react';
import { connect } from 'react-redux';

import { setCustomerFilter } from '../../actions/actions';

let SearchCustomer = ({dispatch}) => {
    let textInput;
    return (
        <div className="cSearch">
            <input 
                type="text"
                className="cInput"
                ref={node => {
                    textInput = node;
                }}
                onChange={() => dispatch(setCustomerFilter(textInput.value))}
                placeholder="Enter customer name"
            />
            <button
                className="cButton"
                onClick={() => {
                    dispatch(setCustomerFilter(''));
                    textInput.value = '';
                }}
            >Show All</button>
        </div>
    )

}

SearchCustomer = connect()(SearchCustomer);

export default SearchCustomer;
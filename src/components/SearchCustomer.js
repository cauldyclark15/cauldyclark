import React from 'react';
import { connect } from 'react-redux';
import { setCustomerFilter } from '../actions';

let SearchCustomer = ({dispatch}) => {
    let textInput;
    return (
        <div>
            <input 
                type="text"
                ref={node => {
                    textInput = node;
                }}
                onChange={() => dispatch(setCustomerFilter(textInput.value))}
                placeholder="Enter customer name"
            />
            <button
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
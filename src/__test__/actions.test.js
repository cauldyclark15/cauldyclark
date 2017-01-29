import { receivePosts, fetchCustomers } from '../actions';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('fetch customers',() => {
        nock('http://localhost:5000/')
            .get('/customers.json')
            .reply(200, {
                body: {customers : ['names']}
            })
    })

    const expectedActions = [
        {type: 'RECEIVE_POSTS', body: {customers : ['names']}}
    ];

    const store = mockStore({customers: []});

    return store.dispatch(fetchCustomers())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
})
import countriesReducer from './countriesReducer';

describe('Testing login mode reducer', () => {

test('check initial state, should be returnedState', () => {
    let action = {type: 'SET_COUNTRIES'};
    let returnedState = countriesReducer(undefined, action);
    expect(returnedState).toEqual(returnedState);
    })

    test('ignore', () => {
        const action = {type: 'IGNORE_ME'};
        const returnedState = countriesReducer(undefined, action);
        expect(returnedState).toEqual([]);
    })
})
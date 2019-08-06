import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* playersSaga(action) {
    try {
        const response = yield Axios.get('/players');
        yield put ({type: 'SET_PLAYERS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting player data', error);
        alert('Error getting player data, try again later');
    }
}

export default playersSaga;

import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* countriesSaga(action) {
    try {
        const response = yield Axios.get(`/countries`);
        yield put ({type: 'SET_COUNTRIES', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting countries data', error);
        alert('Error getting country data, try again later');
    }
}

export default countriesSaga;
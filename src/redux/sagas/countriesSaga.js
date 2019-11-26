import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// listen for dispatch, run corresponding generator function
function* countriesSaga(){
    yield takeEvery('FETCH_COUNTRIES', fetchCountriesSaga);
}

// send axios call (GET) to server (/countries) to retrieve country data
// set country data in countriesReducer with response from server
function* fetchCountriesSaga(action) {
    try {
        const response = yield Axios.get(`/countries`);
        yield put ({type: 'SET_COUNTRIES', payload: response.data})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error getting country data, try again later');
    }
}

export default countriesSaga;
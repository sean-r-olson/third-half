import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* messagesSaga(){
    yield takeEvery('FETCH_MESSAGES', fetchMessagesSaga);
}

function* fetchMessagesSaga(action) {
    try {
        const response = yield Axios.post(`/messages`, action.payload);
        yield put ({type: 'SET_MESSAGES', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting messages data', error);
        alert('Error getting messages data, try again later');
    }
}

export default messagesSaga;
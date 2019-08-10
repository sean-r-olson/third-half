import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* messagesSaga(){
    yield takeEvery('FETCH_MESSAGES', fetchMessagesSaga);
    yield takeEvery('SEND_MESSAGE', sendMessageSaga);
}

function* fetchMessagesSaga(action) {
    try {
        const response = yield Axios.get(`/messages`);
        yield put ({type: 'SET_MESSAGES', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting messages', error);
        alert('Error getting messages, try again later');
    }
}

function* sendMessageSaga(action) {
    try {
        console.log(action.payload);
        yield Axios.post(`/messages`, action.payload);
        yield put({type: 'FETCH_MESSAGES'})
    } catch (error) {
        console.log('error sending message', error);
        alert('Error sending message, try again later');
    }
}

export default messagesSaga;
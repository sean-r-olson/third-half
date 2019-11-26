import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// listen for dispatch, run corresponding generator function
function* messagesSaga(){
    yield takeEvery('FETCH_MESSAGES', fetchMessagesSaga);
    yield takeEvery('SEND_MESSAGE', sendMessageSaga);
    yield takeEvery('UPDATE_MESSAGE_STATUS', updateMessageStatusSaga)
}

// send axios call (GET) to server (/messages) to retrieve messages data
// set messages data in messagesReducer with respons from server
function* fetchMessagesSaga(action) {
    try {
        const response = yield Axios.get(`/messages`);
        yield put ({type: 'SET_MESSAGES', payload: response.data})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error getting messages, try again later');
    }
}

// send axios call (POST) to server (/messages) to post new message
// fetch messages to retrieve updated messages data
function* sendMessageSaga(action) {
    try {
        yield Axios.post(`/messages`, action.payload);
        yield put({type: 'FETCH_MESSAGES'})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error sending message, try again later');
    }
}

// send axios call (PUT) to server (/messages) to update message status
// fetch messages to retrieve updated messages data
function* updateMessageStatusSaga(action) {
    try {
        yield Axios.put(`/messages/${action.payload}`);
        yield put({type: 'FETCH_MESSAGES'})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('error updating message status, try again later');
    }
}

export default messagesSaga;
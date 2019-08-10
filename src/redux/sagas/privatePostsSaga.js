import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

function* privatePostsSaga(){
    yield takeLatest('FETCH_PRIVATE_POSTS', fetchPrivatePostsSaga);
    yield takeLatest('ADD_PRIVATE_POST', addPrivatePostsSaga);
}

function* fetchPrivatePostsSaga(action) {
    try {
        console.log(action.payload);
        const response = yield Axios.get(`/privatePosts/${action.payload}`);
        yield put ({type: 'SET_PRIVATE_POSTS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting private posts', error);
        alert('Error getting private posts, try again later');
    }
}

function* addPrivatePostsSaga(action) {
    try {
        console.log(action.payload)
        yield Axios.post(`/privatePosts`, action.payload);
        yield put ({type: 'FETCH_PRIVATE_POSTS', payload: action.payload.team_id})
    } catch (error) {
        console.log('error adding private posts data', error);
        alert('Error adding private posts data, try again later');
    }
}

export default privatePostsSaga;

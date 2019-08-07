import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* fetchPrivatePostsSaga() {
    try {
        const response = yield Axios.get(`/privatePosts`);
        yield put ({type: 'SET_PRIVATE_POSTS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error adding private post', error);
        alert('Error adding private post, try again later');
    }
}

export default fetchPrivatePostsSaga;
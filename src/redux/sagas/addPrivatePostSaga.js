import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* privatePostsSaga(action) {
    try {
        yield Axios.post(`/privatePosts`, action.payload);
        yield put ({type: 'FETCH_PRIVATE_POSTS'})
    } catch (error) {
        console.log('error getting private posts data', error);
        alert('Error getting private posts data, try again later');
    }
}

export default privatePostsSaga;
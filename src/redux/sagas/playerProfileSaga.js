import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* playerProfileSaga(action) {
    try {
        const response = yield Axios.get(`/players/user/${action.payload}`);
        yield put ({type: 'SET_PLAYER_PROFILE', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting player profile data', error);
        alert('Error getting team data, try again later');
    }
}

export default playerProfileSaga;
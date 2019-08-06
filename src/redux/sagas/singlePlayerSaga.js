import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* singlePlayerSaga(action) {
    try {
        const response = yield Axios.get(`/players/${action.payload.id}`);
        yield put ({type: 'SET_SINGLE_PLAYER', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting single player data', error);
        alert('Error getting data, try again later');
    }
}

export default singlePlayerSaga;
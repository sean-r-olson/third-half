import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* deletePlayerSaga(action) {
    try {
        console.log(action.payload);
        yield Axios.put(`/players/delete/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_TEAM'})
    } catch (error) {
        console.log('error deleting player', error);
        alert('Error deleting player');
    }
}

export default deletePlayerSaga;
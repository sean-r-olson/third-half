import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* editPlayerInfoSaga(action) {
    try {
        console.log(action.payload);
        yield Axios.put(`/players/edit/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_TEAM'})
    } catch (error) {
        console.log('error updating player info', error);
        alert('Error updating player info');
    }
}

export default editPlayerInfoSaga;
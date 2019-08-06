import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* teamsSaga(action) {
    try {
        const response = yield Axios.get(`/teams`);
        yield put ({type: 'SET_TEAMS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting teams data', error);
        alert('Error getting team data, try again later');
    }
}

export default teamsSaga;
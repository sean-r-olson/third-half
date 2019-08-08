import { put } from 'redux-saga/effects';
import Axios from 'axios';

function* fetchTeamDataSaga(action) {
    try {
        console.log(action.payload);
        const response = yield Axios.get(`/teams/${action.payload}`);
        yield put ({type: 'SET_TEAM_DATA', payload: response.data})
        console.log(action.payload);
        console.log(response.data);
    } catch (error) {
        console.log('error getting your teams data', error);
        alert('Error getting your teams data, try again later');
    }
}

export default fetchTeamDataSaga;
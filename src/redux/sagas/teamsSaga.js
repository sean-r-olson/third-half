import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

function* teamsSaga(){
    yield takeLatest('FETCH_ALL_TEAMS', fetchTeamsSaga);
    yield takeLatest('FETCH_TEAM_DATA', fetchTeamDataSaga);
}

function* fetchTeamsSaga(action) {
    try {
        const response = yield Axios.get(`/teams`);
        yield put ({type: 'SET_TEAMS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting teams data', error);
        alert('Error getting team data, try again later');
    }
}

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

export default teamsSaga;
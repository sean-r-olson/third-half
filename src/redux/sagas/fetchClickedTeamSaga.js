import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* fetchClickedTeamSaga(){
    yield takeEvery('FETCH_CLICKED_TEAM', fetchClickedTeam);
}


function* fetchClickedTeam(action) {
    try {
        console.log('in clicked team with:', action.payload)
        const response = yield Axios.get(`/players/clickedTeam/${action.payload}`);
        yield put ({type: 'SET_CLICKED_TEAM', payload: response.data})
        // yield put ({type: 'SET_CLICKED_TEAM_ID', payload: action.payload})
        console.log(response.data);
    } catch (error) {
        console.log('error getting clicked team data', error);
        alert('Error getting team data, try again later');
    }
}

export default fetchClickedTeamSaga;
import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// listen for dispatch, run corresponding generator function
function* fetchClickedTeamSaga(){
    yield takeEvery('FETCH_CLICKED_TEAM', fetchClickedTeam);
}

// send axios call (GET) to server with clicked team's id to retrieve clicked team's players
// set clicked team data in clickedTeamReducer with response from server
function* fetchClickedTeam(action) {
    try {
        const response = yield Axios.get(`/players/clickedTeam/${action.payload}`);
        yield put ({type: 'SET_CLICKED_TEAM', payload: response.data})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error getting team data, try again later');
    }
}

export default fetchClickedTeamSaga;
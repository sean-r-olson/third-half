import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// listen for dispatch, run corresponding generator function
function* playersSaga(){
    yield takeEvery('FETCH_TEAM', getPlayersSaga);
    yield takeEvery('FETCH_PLAYER_PROFILE', playerProfileSaga);
    yield takeEvery('EDIT_PLAYER_PROFILE', editPlayerProfileSaga);
    yield takeEvery('EDIT_PLAYER_INFO', editPlayerInfoSaga);
    yield takeEvery('DELETE_PLAYER', deletePlayerSaga);
}

// send axios call (GET) to server (/players) with user's team id to retrieve belonged team's player info
// set players data in playersReducer with response from server 
function* getPlayersSaga(action) {
    try {
        const response = yield Axios.get(`/players/userTeam/${action.payload}`);
        yield put ({type: 'SET_PLAYERS', payload: response.data})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error getting player data, try again later');
    }
}

// send axios call (GET) to server (/players) with user's id to retrieve user's player info
// set player profile data in playerProfileReducer with response from server
function* playerProfileSaga(action) {
    try {
        const response = yield Axios.get(`/players/user/${action.payload}`);
        yield put ({type: 'SET_PLAYER_PROFILE', payload: response.data})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error getting team data, try again later');
    }
}

// send axios call (PUT) to server (/players) with user's id and user's updated info (name/position) to update user's player info
// fetch player profile with user's id to to retrieve user's updated player info
function* editPlayerProfileSaga(action) {
    try {
        yield Axios.put(`/players/editProfile/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_PLAYER_PROFILE', payload: action.payload.id})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error updating player info');
    }
}

// send axios call (DELETE) to server (/players) with user's id to delete player info
// clear player profile data in playerProfileReducer 
function* deletePlayerSaga(action) {
    try {
        console.log(action.payload);
        yield Axios.delete(`/players/delete/${action.payload.id}`);
        yield put ({type: 'CLEAR_PLAYER_PROFILE'})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error deleting player');
    }
}

// *********************** ADMIN LEVEL: 1 ONLY ******************************

// send axios call (PUT) to server (/players) with clicked player's id/updated player info to update clicked player's info
// fetch team to retrieve updated team data 
function* editPlayerInfoSaga(action) {
    try {
        yield Axios.put(`/players/edit/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_TEAM'})
    } catch (error) {
        // send error to client if server gives 500 response
        alert('Error updating player info');
    }
}

export default playersSaga;

import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* playersSaga(){
    yield takeEvery('FETCH_TEAM', getPlayersSaga);
    yield takeEvery('FETCH_PLAYER', singlePlayerSaga);
    yield takeEvery('FETCH_PLAYER_PROFILE', playerProfileSaga);
    yield takeEvery('EDIT_PLAYER_PROFILE', editPlayerProfileSaga);
    yield takeEvery('EDIT_PLAYER_INFO', editPlayerInfoSaga);
    yield takeEvery('DELETE_PLAYER', deletePlayerSaga);
    yield takeEvery('FETCH_CLICKED_TEAM', fetchClickedTeam)
}

function* getPlayersSaga(action) {
    try {
        console.log(action.payload)
        const response = yield Axios.get(`/players/userTeam/${action.payload}`);
        yield put ({type: 'SET_PLAYERS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting player data', error);
        alert('Error getting player data, try again later');
    }
}

function* singlePlayerSaga(action) {
    try {
        const response = yield Axios.get(`/players/${action.payload.id}`);
        yield put ({type: 'SET_SINGLE_PLAYER', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting single player data', error);
        alert('Error getting team data, try again later');
    }
}

function* playerProfileSaga(action) {
    try {
        console.log(action.payload)
        const response = yield Axios.get(`/players/user/${action.payload}`);
        yield put ({type: 'SET_PLAYER_PROFILE', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting player profile data', error);
        alert('Error getting team data, try again later');
    }
}

function* editPlayerProfileSaga(action) {
    try {
        console.log('in editPlayerProfileSaga with:', action.payload);
        yield Axios.put(`/players/editProfile/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_PLAYER_PROFILE', payload: action.payload.id})
    } catch (error) {
        console.log('error updating player info', error);
        alert('Error updating player info');
    }
}

function* editPlayerInfoSaga(action) {
    try {
        console.log(action.payload);
        const response = yield Axios.put(`/players/edit/${action.payload.id}`, action.payload);
        yield put ({type: 'FETCH_TEAM'})
    } catch (error) {
        console.log('error updating player info', error);
        alert('Error updating player info');
    }
}

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

function* fetchClickedTeam(action) {
    try {
        console.log('in clicked team with:', action.payload)
        const response = yield Axios.get(`/players/clickedTeam/${action.payload}`);
        yield put ({type: 'SET_CLICKED_TEAM', payload: response.data})
        yield put ({type: 'SET_CLICKED_TEAM_ID', payload: action.payload})
        console.log(response.data);
    } catch (error) {
        console.log('error getting clicked team data', error);
        alert('Error getting team data, try again later');
    }
}

export default playersSaga;

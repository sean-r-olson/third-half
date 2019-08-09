import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* playersSaga(){
    yield takeEvery('FETCH_TEAM', getPlayersSaga);
    yield takeEvery('FETCH_PLAYER', singlePlayerSaga);
    yield takeEvery('FETCH_PLAYER_PROFILE', playerProfileSaga);
    yield takeEvery('EDIT_PLAYER_INFO', editPlayerInfoSaga);
    yield takeEvery('DELETE_PLAYER', deletePlayerSaga);
}

function* getPlayersSaga(action) {
    try {
        const response = yield Axios.get('/players');
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
        const response = yield Axios.get(`/players/user/${action.payload}`);
        yield put ({type: 'SET_PLAYER_PROFILE', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting player profile data', error);
        alert('Error getting team data, try again later');
    }
}

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

export default playersSaga;

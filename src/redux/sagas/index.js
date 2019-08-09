import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import playersSaga from './playersSaga';
import singlePlayerSaga from './singlePlayerSaga';
import teamsSaga from './teamsSaga';
import countriesSaga from './countriesSaga';
import playerProfileSaga from './playerProfileSaga';
import addPrivatePostSaga from './addPrivatePostSaga';
import fetchPrivatePostsSaga from './fetchPrivatePostsSaga';
import fetchTeamDataSaga from './fetchTeamDataSaga';
import editPlayerInfoSaga from './editPlayerInfoSaga';
import deletePlayerSaga from './deletePlayerSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_TEAM', playersSaga);
  yield takeLatest('FETCH_PLAYER', singlePlayerSaga);
  yield takeEvery('FETCH_ALL_TEAMS', teamsSaga);
  yield takeEvery('FETCH_COUNTRIES', countriesSaga);
  yield takeEvery('FETCH_PLAYER_PROFILE', playerProfileSaga);
  yield takeEvery('ADD_PRIVATE_POST', addPrivatePostSaga);
  yield takeEvery('FETCH_PRIVATE_POSTS', fetchPrivatePostsSaga);
  yield takeEvery('FETCH_TEAM_DATA', fetchTeamDataSaga);
  yield takeEvery('EDIT_PLAYER_INFO', editPlayerInfoSaga);
  yield takeEvery('DELETE_PLAYER', deletePlayerSaga);
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    playersSaga(),
    // singlePlayerSaga(),
    // teamsSaga(),
    // countriesSaga(),
    // playerProfileSaga(),
    // addPrivatePostSaga(),
    // fetchPrivatePostsSaga(),
    // fetchTeamDataSaga(),
    // editPlayerInfoSaga(),
    // deletePlayerSaga(),
  ]);
}

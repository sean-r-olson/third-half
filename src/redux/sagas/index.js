import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import playersSaga from './playersSaga';
import singlePlayerSaga from './singlePlayerSaga';
import teamsSaga from './teamsSaga';
import countriesSaga from './countriesSaga';
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
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    playersSaga(),
    singlePlayerSaga(),
    teamsSaga(),
    countriesSaga(),
  ]);
}

import { all } from 'redux-saga/effects';
import countriesSaga from './countriesSaga';
import privatePostsSaga from './privatePostsSaga';
import teamsSaga from './teamsSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import playersSaga from './playersSaga';
import messageSaga from './messageSaga';
import fetchClickedTeamSaga from './fetchClickedTeamSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    privatePostsSaga(),
    playersSaga(),
    teamsSaga(),
    countriesSaga(),
    messageSaga(),
    fetchClickedTeamSaga(),
  ]);
}

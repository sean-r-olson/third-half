import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* graphicsSaga(){
    yield takeEvery('FETCH_GRAPHICS', fetchGraphicsSaga);
}

function* fetchGraphicsSaga(action) {
    try {
        const response = yield Axios.get(`/graphics`);
        yield put ({type: 'SET_GRAPHICS', payload: response.data})
        console.log(response.data);
    } catch (error) {
        console.log('error getting graphics data', error);
        alert('Error getting graphics');
    }
}

export default graphicsSaga;
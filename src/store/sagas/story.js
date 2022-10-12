import {GET_STORIES_REQUEST, GET_STORIES_SUCCESS, GET_STORIES_FAIL} from "../actions/story";
import {takeLatest, call, put} from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_STORIES_REQUEST, getStoriesRequest);
}

function* getStoriesRequest({payload}) {
    try {
        const {data} = yield call(Api.getStories, payload.search);

        yield put({
            type: GET_STORIES_SUCCESS,
            payload: {status: 'ok', data},
        });
    } catch (e) {
        yield put({
            type: GET_STORIES_FAIL,
            payload: {status: 'fail', message: e.message},
        });
    }
}
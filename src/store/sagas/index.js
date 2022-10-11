import story from './story';
import { all, fork } from 'redux-saga/effects'

export default function* watchers() {
    yield all([
        story
    ].map(fork))
}
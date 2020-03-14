import {Task} from 'redux-saga';
import {select, take, call, put, fork, cancel} from 'redux-saga/effects';
import {selectPlayer} from '../selector';
import {Player} from '../reducer';
import {getType} from 'typesafe-actions';
import {updatePlayer, setFrame} from '../action';
import {selectMessageListDuration} from '../../Message/selector';

const waitNextFrame = async (): Promise<number> => {
    return await new Promise((resolve) => requestAnimationFrame(resolve));
}

const play = function* () {
    while (1) {
        yield call(waitNextFrame);
        const player: Player = yield select(selectPlayer);
        const duration: number = yield select(selectMessageListDuration);
        if (player.frame < duration) {
            yield put(setFrame(player.frame + 1));
        } else {
            yield put(updatePlayer({paused: true}));
        }
    }
}

export const controlFrame = function* () {
    let task: Task | null = null;
    while (1) {
        yield take(getType(updatePlayer));
        const player: Player = yield select(selectPlayer);
        if (player.paused) {
            if (task) {
                yield cancel(task);
            }
            task = null;
        } else if (!task) {
            const duration: number = yield select(selectMessageListDuration);
            if (duration <= player.frame) {
                yield put(setFrame(0));
            }
            task = yield fork(play);
        }
    }
};

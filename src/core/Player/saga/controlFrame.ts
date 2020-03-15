import {Task} from 'redux-saga';
import {select, take, call, put, fork, cancel, all} from 'redux-saga/effects';
import {selectPlayerFrame} from '../selector';
import {getType, ActionType} from 'typesafe-actions';
import {setFrame, setPause} from '../action';
import {selectMessageListDuration} from '../../Message/selector';

const waitNextFrame = async (): Promise<number> => {
    return await new Promise((resolve) => requestAnimationFrame(resolve));
}

const play = function* (framePerSecond = 60) {
    const [f0, t0]: [number, number] = yield all([
        select(selectPlayerFrame),
        call(waitNextFrame),
    ]);
    while (1) {
        const [t1, duration]: [number, number] = yield all([
            call(waitNextFrame),
            select(selectMessageListDuration),
        ]);
        const frame = Math.round(f0 + (t1 - t0) * framePerSecond / 1000);
        if (frame < duration) {
            yield put(setFrame(frame));
        } else {
            yield put(setPause(true));
        }
    }
};

export const controlFrame = function* () {
    let task: Task | null = null;
    while (1) {
        const {payload: paused}: ActionType<typeof setPause> = yield take(getType(setPause));
        if (paused) {
            if (task) {
                yield cancel(task);
            }
            task = null;
        } else if (!task) {
            const duration: number = yield select(selectMessageListDuration);
            const frame: number = yield select(selectPlayerFrame);
            if (duration <= frame) {
                yield put(setFrame(0));
            }
            task = yield fork(play);
        }
    }
};

import { randomBingoBall } from '../components/BingoEngine';

import {
  BINGO_START,
  BINGO_STOP,
  BINGO_UPDATE_TIMER_INTERVAL_ID,
  BINGO_ADD_TO_LIST,
} from './types';

export const bingoStart = () => {
  return {
    type: BINGO_START,
  };
};

export const bingoStop = () => {
  return {
    type: BINGO_STOP,
  };
};

export const bingoUpdateTimerIntervalId = (timerIntervalId) => {
  return {
    type: BINGO_UPDATE_TIMER_INTERVAL_ID,
    payload: timerIntervalId,
  };
};

export const bingoAddToList = () => {
  return (dispatch, getState) => {
    const { bingoBallsList } = getState().Bingo;
    const randomNumber = randomBingoBall(bingoBallsList);
    dispatch({
      type: BINGO_ADD_TO_LIST,
      payload: randomNumber
    });
  };
};

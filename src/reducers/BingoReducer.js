import {
  BINGO_START,
  BINGO_STOP,
  BINGO_ADD_TO_LIST,
  BINGO_UPDATE_TIMER_INTERVAL_ID,
  BINGO_COMPLETE,
  BINGO_RESTART_INITIATED,
  BINGO_RESTART,
} from '../actions/types';

const INITIAL_STATE = {
  bingoGameHasStarted: false,
  bingoGameHasCompleted: false,
  bingoRestartInitiated: false,
  bingoTimerIntervalId: null,
  bingoBallsList: [],
  bingoBallsListToDisplay: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BINGO_START:
      return { ...state, bingoGameHasStarted: true };
    case BINGO_STOP:
      return { ...state, bingoGameHasStarted: false };
    case BINGO_UPDATE_TIMER_INTERVAL_ID:
      return { ...state, bingoTimerIntervalId: action.payload };
    case BINGO_ADD_TO_LIST: {
      const newBingoBallsList = [...state.bingoBallsList, action.payload];
      return { ...state, bingoBallsList: newBingoBallsList };
    }
    case BINGO_COMPLETE:
      return { ...state, bingoGameHasCompleted: true };
    case BINGO_RESTART_INITIATED:
      return { ...state, bingoRestartInitiated: true };
    case BINGO_RESTART:
      return INITIAL_STATE;
    default:
      return state;
  }
};

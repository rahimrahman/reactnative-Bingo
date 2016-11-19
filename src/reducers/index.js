import { combineReducers } from 'redux';
import BingoReducer from './BingoReducer';

export default combineReducers({
  Bingo: BingoReducer,
});

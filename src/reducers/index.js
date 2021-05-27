import { combineReducers } from "redux";
import { items, itemsHasErrored, itemsIsLoading } from "./items";
import { authorizedUser } from './auth';
import { redirectedPath } from './redirect';
import { saveQuestionAnswer } from './../actions/saveQuestonAnswer';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  authorizedUser,
  redirectedPath,
  saveQuestionAnswer,
});

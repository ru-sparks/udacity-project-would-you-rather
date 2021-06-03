import { combineReducers } from "redux";
import { items, itemsHasErrored, itemsIsLoading } from "./items";
import { authorizedUser } from './auth';
import { redirectedPath } from './redirect';
import { saveQuestionAnswer } from './questionAnswers';
import { saveNewQuestion } from './saveNewQuestion';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  authorizedUser,
  redirectedPath,
  saveQuestionAnswer,
  saveNewQuestion,
});

import { NEW_QUESTION_SAVED_SUCCESS } from "../actions/newQuestion";

export function saveNewQuestion(state = {}, action) {
  switch (action.type) {
    case NEW_QUESTION_SAVED_SUCCESS:
      return action.saveNewQuestionResponse;
    default:
      return state;
  }
}

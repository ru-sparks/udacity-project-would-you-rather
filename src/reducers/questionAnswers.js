import { QUESTIONS_SAVED_SUCCESS } from "../actions/questionAnswers";

export function items(state = {}, action) {
  switch (action.type) {
    case QUESTIONS_SAVED_SUCCESS:
      return action.saveQuestionResponse;
    default:
      return state;
  }
}

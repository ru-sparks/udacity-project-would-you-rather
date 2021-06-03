export const  NEW_QUESTION_SAVED_SUCCESS = "NEW_QUESTION_SAVED_SUCCESS";

export function newQuestionSavedSuccess(saveNewQuestionResponse) {
  return {
    type: NEW_QUESTION_SAVED_SUCCESS,
    saveNewQuestionResponse,
  };
}

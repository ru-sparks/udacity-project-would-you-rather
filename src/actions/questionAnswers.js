export const  QUESTIONS_SAVED_SUCCESS = "QUESTIONS_SAVED_SUCCESS";

export function questionsSavedSuccess(saveQuestionResponse) {
  return {
    type: QUESTIONS_SAVED_SUCCESS,
    saveQuestionResponse,
  };
}

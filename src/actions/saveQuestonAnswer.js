import {
  _getQuestions,
  _getUsers,
  _saveQuestionAnswer,
} from "./../test-data/_DATA";
import { questionsSavedSuccess } from "./questionAnswers";
import { itemsFetchData } from "./fetchData";

export function saveQuestionAnswer(authedUser, qid, answer, history) {
  return (dispatch) => {
    _saveQuestionAnswer(authedUser, qid, answer).then((response) => {
      dispatch(questionsSavedSuccess(response));
      dispatch(
        itemsFetchData("", () => {
          history.push("/");
        })
      );
    });
  };
}

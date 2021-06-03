import { _saveQuestionAnswer } from "../test-data/_DATA";
import { questionsSavedSuccess } from "../actions/questionAnswers";
import { itemsFetchData } from "./fetchData";

export function saveQuestionAnswer(authedUser, qid, answer, history) {
  return (dispatch) => {
    _saveQuestionAnswer(authedUser, qid, answer).then((response) => {
      dispatch(questionsSavedSuccess(true));
      dispatch(
        itemsFetchData("", () => {
          history.push("/");
        })
      );
    });
  };
}

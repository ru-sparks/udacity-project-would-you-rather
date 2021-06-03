import {  _saveQuestion } from "../test-data/_DATA";
import { itemsFetchData } from "./fetchData";
import { newQuestionSavedSuccess } from "../actions/newQuestion";


/*

import { _saveQuestionAnswer } from "../test-data/_DATA";
import { questionsSavedSuccess } from "../actions/questionAnswers";
import { itemsFetchData } from "../api/fetchData";

*/

export function saveNewQuestion(optionOneText, optionTwoText, author, history) {
  return (dispatch) => {
    _saveQuestion({ optionOneText, optionTwoText, author }).then((response) => {
      dispatch(newQuestionSavedSuccess(response));
      dispatch(
        itemsFetchData("", () => {
          history.push("/");
        })
      );
    });
  };
}

/*
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


*/
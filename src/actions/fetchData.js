import {
  itemsIsLoading,
  itemsFetchDataSuccess,
  itemsHasErrored,
} from "./items";

import { _getQuestions, _getUsers } from "./../test-data/_DATA";

export function itemsFetchData(url, callBack) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    _getUsers()
      .then((users) => {
        _getQuestions()
          .then((questions) => {
            dispatch(itemsIsLoading(false));
            let items = {
              users,
              questions,
            };
            dispatch(itemsFetchDataSuccess(items));
            if (callBack) {
              callBack();
            }
          })
          .catch(() => dispatch(itemsHasErrored(true)));
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

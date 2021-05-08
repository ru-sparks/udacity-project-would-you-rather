import {
  itemsIsLoading,
  itemsFetchDataSuccess,
  itemsHasErrored,
} from "./items";

import { _getQuestions, _getUsers } from "./../test-data/_DATA";

export function itemsFetchData(url) {
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
          })
          .catch(() => dispatch(itemsHasErrored(true)));
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

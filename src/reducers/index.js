import { combineReducers } from "redux";
import { items, itemsHasErrored, itemsIsLoading } from "./items";
import { authorizedUser } from './auth';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  authorizedUser,
});

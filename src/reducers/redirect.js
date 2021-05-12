
import { REDIRECTED_PATH } from '../actions/redirect';

export function redirectedPath(state = "", action) {
    switch (action.type) {
      case REDIRECTED_PATH : {
        return action.redirectedPath;
      }
      default:
        return state;
    }
  }
  
  
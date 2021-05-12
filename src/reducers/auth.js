
import { AUTHORIZE_USER } from './../actions/auth';

export function authorizedUser(state = "", action) {
    switch (action.type) {
      case AUTHORIZE_USER : {
        return action.authorizedUser;
      }
      default:
        return state;
    }
  }
  
  
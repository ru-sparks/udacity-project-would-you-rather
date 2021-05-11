
import { AUTHORIZE_USER } from './../actions/auth';

export function authorizedUser(state = "", action) {
    switch (action.type) {
      case AUTHORIZE_USER : {
        // let newState = { ...state, authorizedUser: action.authorizedUser}  
        // return newState;
        debugger;
        return action.authorizedUser;
      }
      default:
        return state;
    }
  }
  
  
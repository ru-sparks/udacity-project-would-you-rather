
import { AUTHORIZE_USER } from './../actions/auth';

export function authorizedUser(state = {}, action) {
    switch (action.type) {
      case AUTHORIZE_USER : {
          debugger;
        // let newState = { ...state, authorizedUser: action.authorizedUser}  
        // return newState;
        return action.authorizedUser;
      }
      default:
        return state;
    }
  }
  
  
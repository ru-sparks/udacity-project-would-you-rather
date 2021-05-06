import { ADD_TODO, REMOVE_TODO } from "./actionCreators";

const initialState = {
  todos: [
  ],
  id: 2,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      let newState = { ...state };
      newState.id++;
      newState.todos.push({ id: newState.id, task: action.task });
      return {
        ...newState,
      };
    }
    case REMOVE_TODO: {
      let todos = state.todos.filter((task) => task.id !== action.id);
      let newState = { ...state, todos };
      return newState;
    }
    default:
      return state;
  }
};

export default rootReducer;

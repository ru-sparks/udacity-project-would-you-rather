export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const addTodo = (task) => {
    let rc = {
        type: ADD_TODO,
        task
    }
    return rc;
}

export const removeTodo = (id) => {
    return {
        type: REMOVE_TODO,
        id
    }
}
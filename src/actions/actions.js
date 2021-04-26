export const UPDATE_COLOR = 'UPDATE_COLOR';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const INSERT_TODO = 'INSERT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export function updateColor(color){
    return {
        type:UPDATE_COLOR,
        color
    }
}

export function updateText(text){
    return {
        type : UPDATE_TEXT,
        text
    }
}

export function  insertTodo(todo){
    return {
        type : INSERT_TODO,
        todo
    }
}

export function  deleteTodo(id){
    return {
        type : DELETE_TODO,
        id
    }
}

export function updateTodo(todos){
    return {
        type : UPDATE_TODO,
        todos
    }
}
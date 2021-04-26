import {combineReducers} from "redux";
import {UPDATE_COLOR,UPDATE_TEXT,INSERT_TODO,DELETE_TODO,UPDATE_TODO} from '../actions/actions'

const todoState = {
    color : '',
    input : '',
    todos : []
}

function todoList (state = todoState,action){
    switch (action.type){
        case UPDATE_COLOR :
            return Object.assign({},state,{'color':action.color})
        case UPDATE_TEXT :
            return Object.assign({},state,{'input':action.text})
        case INSERT_TODO :
            return Object.assign({},state,{'todos':state.todos.concat(action.todo)})
        case DELETE_TODO :
            return Object.assign({},state,{'todos':state.todos.filter(todo => todo.id !== action.id)});
        case UPDATE_TODO :
            return Object.assign({},state,{'todos':action.todos})
        default: return  state;
    }
}

const todoApp = combineReducers({
    todoList,
})

export default todoApp;
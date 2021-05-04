export const INIT_TODOLIST = 'INIT_TODOLIST';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const INSERT_TODO = 'INSERT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export function initTodoList(todos){
    return {
        type:INIT_TODOLIST,
        todos
    }
}

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

export function fetchPost(url,data){
    return function (dispatch){
         data = reqeustPosts(url,dispatch,data);
         fetch(url,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then(
            res=> {
                receivePosts(url,res,dispatch);
            }
        )
    }
}

function reqeustPosts(url,dispatch,data){
    if(url === '/todoList/init'){
        dispatch(updateColor('#0a0a0a'))
    }else if(url === '/todoList/insert'){
        dispatch(insertTodo(data));
    }else if(url === '/todoList/update'){
        dispatch(updateTodo(data.todos));
        let index = data.index;
        data = {...data.todos[index]}
    }
    return data;
}

function receivePosts (url,res,dispatch){
    if(url === '/todoList/init') {
        const resData = JSON.parse(res.data);
        const todoList = resData.map(todo => {
                todo.checked === 0 ? todo.checked = false : todo.checked = true;
                todo.id = parseInt(todo.id);
                return todo;
            }
        );
        dispatch(updateTodo(todoList));
    }else if(url === '/todoList/delete'){
        const resData = JSON.parse(res.data);
        dispatch(deleteTodo(resData.id));
    }else if(url === '/todoList/insert'){
        dispatch(updateText(''));
    }
}
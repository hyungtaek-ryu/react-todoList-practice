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

export function fetchPost(url,data={}){
    return function (dispatch,getState){
         const state = getState();
         data = reqeustPosts(url,dispatch,state,data);
         fetch(url,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then(
            res=> {
                receivePosts(url,res,dispatch,data);
            }
        )
    }
}

function reqeustPosts(url,dispatch,state,data){
    if(url === '/todoList/init'){
        dispatch(updateColor('#0a0a0a'))
    }else if(url === '/todoList/insert'){
        let todos = [...state.todoList.todos];
        let id = 0;

        if(todos.length>0){
            id = todos[todos.length-1].id;
        }

        data  = {
            id : ++id,
            text: state.todoList.input,
            checked: false,
            color: state.todoList.color
        }
    }else if(url === '/todoList/update'){
        const {todos} = state.todoList;
        const index = todos.findIndex(todo => todo.id ===data.id); //파라미터로 받은 id가 몇 번째 아이템인지..

        const nextTodos = [...todos]; //배열을 복사.
        const selected = todos[index];

        //기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        dispatch(updateTodo(nextTodos));
        data = {...nextTodos[index]}
    }
    return data;
}

function receivePosts (url,res,dispatch,data){
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
        dispatch(insertTodo(data));
        dispatch(updateText(''));
    }
}
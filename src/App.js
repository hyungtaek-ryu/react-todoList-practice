import React, {Component} from 'react';
import {connect} from "react-redux";
import {insertTodo, updateColor, updateText,deleteTodo,updateTodo} from "./actions/actions";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form"
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";

class App extends Component {
    id = 0
    colorList = ['#343a40', '#f03e3e', '#12b886', '#228ae6']

    handleRemove = (id) => {
        const {dispatch} = this.props;
        dispatch(deleteTodo(id))
    }

    handleToggle = (id) => {
        const {dispatch} = this.props;
        const {todos} = this.props.state.todoList;
        const index = todos.findIndex(todo => todo.id ===id); //파라미터로 받은 id가 몇 번째 아이템인지..

        const nextTodos = [...todos]; //배열을 복사.
        const selected = todos[index];

        //기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        dispatch(updateTodo(nextTodos));
    }

    handleChange = (e) => {
        const {dispatch} = this.props;
        dispatch(updateText(e.target.value))
    }

    handleCreate = () => {
        const {dispatch} = this.props;

        dispatch(insertTodo({
            id: this.id++,
            text: this.props.state.todoList.input,
            checked: false,
            color: this.props.state.todoList.color
        }));

        dispatch(updateText(''));
    }

    handleKeyPress = (e) => {
        if(e.key==='Enter'){
            this.handleCreate();
        }
    }

    handleColorChange = (e) => {
       const {dispatch} = this.props;
       dispatch(updateColor(e.target.dataset.color))
    }

    render(){
        //const {input,color,todos} = this.state;  아래와 같이 리덕스에서 관리하는 state로 변경.
        const {input,color,todos} = this.props.state.todoList;
        return(
            <TodoListTemplate form={(<Form
                value={input}
                color={color}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                onCreate={this.handleCreate}
            />)}
                palette={<Palette color={this.colorList} selectedColor={color} onChange={this.handleColorChange}/>}
            >
                <TodoItemList todos={todos} onToggle={this.handleToggle} onRemove={this.handleRemove}/>
            </TodoListTemplate>
        )
    }
}

function select(state) {
    return {
        state
    }
}

//provider 태그의 store 와 연결.
export default connect(select)(App);
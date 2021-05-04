import React, {Component} from 'react';
import {connect} from "react-redux";
import { updateColor,updateText,fetchPost} from "./actions/actions";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form"
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";

class App extends Component {
    id = 0
    colorList = ['#0a0a0a', '#f03e3e', '#12b886', '#9d9a46','#228ae6']

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPost('/todoList/init'),{});
    }

    handleRemove = (id) => {
        const {dispatch} = this.props;
        const data = {id : id};
        dispatch(fetchPost('/todoList/delete',data));
    }

    handleToggle = (id) => {
        const {dispatch} = this.props;
        const data = {id : id};
        dispatch(fetchPost('/todoList/update',data))
    }

    handleChange = (e) => {
        const {dispatch} = this.props;
        dispatch(updateText(e.target.value))
    }

    handleCreate = () => {
        const {dispatch} = this.props;
        dispatch(fetchPost('/todoList/insert'))
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
        state:state
    }
}

//provider 태그의 store 와 연결.
export default connect(select)(App);
import React, {Component} from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form"
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";

class App extends Component {
    id = 0
    colorList = ['#343a40', '#f03e3e', '#12b886', '#228ae6']
    state = {
        input : '',
        color : '',
        todos : [

        ]
    }

    handleRemove = (id) => {
        const {todos} = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    handleToggle = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id ===id); //파라미터로 받은 id가 몇 번째 아이템인지..

        const nextTodos = [...todos]; //배열을 복사.
        const selected = todos[index];

        //기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };
        this.setState({
            todos:nextTodos
        });
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleCreate = () => {
        const { input,color, todos} = this.state;
        this.setState({
            input: '',
            color:'',
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false,
                color: color
            })
        })
    }

    handleKeyPress = (e) => {
        if(e.key==='Enter'){
            this.handleCreate();
        }
    }

    handleColorChange = (e) => {
        this.setState({
            color : e.target.dataset.color
        })
    }

    render(){
        const {input,color,todos} = this.state;
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

export default App;
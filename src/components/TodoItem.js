import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const { text, checked, id, color, onToggle, onRemove } = this.props;
        return(
            <div className="todo-item" onClick={()=>onToggle(id)}>
                <div className="remove" onClick={(e)=>{
                    e.stopPropagation(); // 버블업으로 click evnet가  onToggle 이 실행되지 않게 하도록 하기 위함.
                    onRemove(id)}
                }>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`} style={{color:color}}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">&#x2713;</div>)
                }
            </div>
        );
    }
}

export default TodoItem;
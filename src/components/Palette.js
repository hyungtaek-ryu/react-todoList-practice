import React, {Component} from 'react';
import './Palette.css';

class Palette extends Component{

    constructor(props) {
        super(props);
        this.state = {
            colorItems : props.color.map(
                (colorItem,index) => ({
                    "color":colorItem,
                    "status": index === 0 ? 'active' : 'false',
                })
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.color !== nextProps.color;
    }


    changeColor = (e) => {
        const {color,onChange} = this.props;
        const selectedColor = e.target.dataset.color;

        this.setState({
            colorList : color.map(
                colorItem => ({
                    "color":colorItem,
                    "status":colorItem === selectedColor?'active':'false'
                })
            )
        })
        onChange(e);
    }

    render(){
        const {colorItems} = this.state;
        const colorList = colorItems.map(color =>
            <div onClick={this.changeColor} className={`color ${color.status}`} key={color.color} style={{background:color.color}} data-color={color.color}/>
        )

        return(
            <div className="palette">
                {colorList}
            </div>
        )
    }
}

export default Palette;

import React, {Component} from 'react';
import './Palette.css';

class Palette extends Component{
    colorItems = []

    constructor(props) {
        super(props);
        this.colorItems = props.color.map(
            (colorItem,index) => ({
                "color":colorItem,
                "status": index === 0 ? 'active' : 'false',
            })
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.selectedColor !== nextProps.selectedColor;
    }

    changeColor = (e) => {
        const {color,onChange} = this.props;
        this.colorItems = color.map(
            colorItem => ({
                "color":colorItem,
                "status":colorItem === e.target.dataset.color?'active':'false'
            })
        )
        onChange(e);
    }

    render(){
        const {selectedColor} = this.props;
        const colorList = this.colorItems.map(color =>
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

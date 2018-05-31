/*
function person(){
    return <h2></h2>
}*/

/* ES2015
var person = function(){

}*/

import React, {Component} from 'react';
import Radium from 'radium';
import classes from './Person.css'
import WithClass from '../../hoc/WithClass';
import WithClass2 from '../../hoc/WithClass2';
import Aux from '../../hoc/Auxilliary';
import PropTypes from 'prop-types';
import {AuthContext} from "../../../containers/App";

class Person extends Component {
    constructor(props){
        super(props);
        this.inputElement = React.createRef(); // 16.3 version of createRef
        // old ref <input ref={(inp)=>{this.inputElement = inp}} type='text' value={this.props.name} onChange={this.props.changed}/>
    }
    componentDidMount(){
    }

    myFocus(){
        this.inputElement.current.focus(); // this is the <input../> javascript focus() which highlights the input HTML Eelement
    }
    // 'auth' => ... in AuthContext.Consumer can be whatever name
    render() {
        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth =>auth? <p>Im authenticated</p>: null}
                    </AuthContext.Consumer>
                <p onClick={this.props.click}>Im a {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>

                <input ref={this.inputElement} type='text' value={this.props.name} onChange={this.props.changed}/>
            </Aux>
        );
    }
}

/*const person = (props) => {
    /!*const style = {
        /!**Pseudo selector has to use Randium(exported_class_or_function)
         * but keyframe or transformation type of css like @media need to add Styleroot in the App.js**!/
        '@media (min-width:500px)':{
            width:'450px'
        }

        <div className='Person' style={style}>
    };*!/

    return (
        <div className={classes.Person}>
            <p onClick={props.click}>Im a {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            {/!**children = are those in between open and close tag e.g. <Person> children here </Person>**!/}
            <input type='text' value={props.name} onChange={props.changed}/>
        </div>
    );
};*/

// export default Radium(person);
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age:PropTypes.number,
    changed: PropTypes.func,
};

export default WithClass2(Person, classes.Person);
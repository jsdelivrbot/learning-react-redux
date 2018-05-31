import React, {Component} from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        userInput: ''
    };

    inputChangeHandler = (event) => {
        this.setState({userInput: event.target.value});
    };

    deleteCharHandler= (index)=>{
        let myArr = this.state.userInput.split('');
        myArr.splice(index, 1);
        const updatedText = myArr.join('');
        this.setState({userInput:updatedText});
    };

    render() {
        const charList = this.state.userInput.split('').map((eachChar, index) => {
            return <CharComponent character={eachChar} key={index} clicked={()=>this.deleteCharHandler(index)}/>
        });

        return (
            <div className="App">
                <input type='text' value={this.state.userInput} onChange={(event) => this.inputChangeHandler(event)}/>
                <p>{this.state.userInput}</p>
                <ValidationComponent inputLength={this.state.userInput.length}/>
                {charList}
            </div>

        );
    }
}

export default App;

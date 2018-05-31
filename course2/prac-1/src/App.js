import React, {Component} from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import './UserOutput/UserOutput.css';
import UserInput from './UserInput/UserInput';

class App extends Component {
    state={
      username:'Some Username from State'
    };

    manipulateStateHandler=(param)=>{
        console.log(param);
      this.setState({username:param.target.value})
    };

    render() {

        return (
            <div className="App">
                <UserInput manipulated={this.manipulateStateHandler}/>
                <UserOutput username={this.state.username}/>
            </div>
        );
    }
}

export default App;

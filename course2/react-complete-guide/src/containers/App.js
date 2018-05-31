import React, {PureComponent, Component} from 'react';
import classes from './App.css';
import '../components/Persons/Person/Person.css';
import Person from '../components/Persons/Person/Person';
import Radium, {StyleRoot} from 'radium';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import WithClass from '../components/hoc/WithClass';
import WithClass2 from '../components/hoc/WithClass2';
import Aux from '../components/hoc/Auxilliary';

export const AuthContext= React.createContext(false); // and use it like <AuthContext.Provider value={...}/> value is reserved word

class App extends PureComponent {
    //React 16.3 discourages componentWillMount , componentWillUpdate, componentWillReceiveProps because often uses incorrectly like setState in it

    //new lifecycle hook 1 - executed when props are updated and update state. gets called before render()
    static getDerivedStateFromProps(nextProps, prevState){
        //use case: receive newprops and change new state
        console.log('inside getDeriveStateFromProps', nextProps, prevState);
        return prevState;
    }
    //new lifecycle hook2 - get a DOM snapshot right before it's updated.
    //executed this first then didUpdate later on
    getSnapshotBeforeUpdate(){

    }

    componentDidUpdate(){

    }

    constructor(props) {
        super(props);
        console.log('[App;js] Inside construcotr' + props);
        this.state = {
            persons: [
                {id: 'asd', name: 'Max', age: 28},
                {id: 'zxc', name: 'Manu', age: 29},
                {id: 'qwe', name: 'Mary', age: 30}
            ],
            showPersons: false,
            toggleClicked: 0,
            authenticated:false
        };
    }

    loginHandler= ()=>{
        this.setState({authenticated:true})
    };


/*    componentWillMount() {
        console.log('[App.js]Inside componentWillMount');
    }

    componentDidMount() {
        console.log('[App.js] did mount');
    }*/

    /*  dont need this since pureComponent
        shouldComponentUpdate(nextProps, nextState){
            console.log('[Update app.js] inside shouldComponentUpdate');
            return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
        }*/

    /* here or constructor()
    state = {
        persons: [
            {id: 'asd', name: 'Max', age: 28},
            {id: 'zxc', name: 'Manu', age: 29},
            {id: 'qwe', name: 'Mary', age: 30}
        ]
    };*/
    //<name>Handler as your click function etc. etc..
    switchNameHandler = (newName) => {
        console.log('was clicked');
        //dont do this.state.persons[0].name = 'abc';
        this.setState({
            persons: [
                {name: newName, age: 28},
                {name: 'Manu', age: 29},
                {name: 'Mary', age: 31}
            ]
        })
    };

    nameChangedHandler = (namechange, index) => {
        /*this.setState({
            persons: [
                {name: 'Max', age: 28},
                {name: event.target.value, age: 29},
                {name: 'Mary', age: 31}
            ],
            showPersons: true
        });*/
        const personIndex = this.state.persons.findIndex(person => {
            return person.id === index
        }); //find it
        const person = {...this.state.persons[personIndex]}; //immutable, copy it
        person.name = namechange.target.value; // then change it
        const persons = [...this.state.persons]; //then copy previous state
        persons[personIndex] = person; // update the copied array
        this.setState({persons: persons}); // setState
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        })
        //using this.state.toggleClicked in this.setState({}) might have a problem if other components are using accessing/manipulating this.state.toggleClicked
        //with above codes, it's better because with use prevState to update it. SUPER IMPORTANT if using prevState to do some calculation and other components might just do fine
    };

    deletePersonHandler = (indexSelected) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(indexSelected, 1);
        this.setState({persons: persons});
    };

    render() {
        /*const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            //':hover': {backgroundColor: 'lightgreen', color: 'black'}
        };*/

        console.log('[App.js] render()')
        let persons = null;
        if (this.state.showPersons) {
            // this is jsx using '{}' to render stuffs dnyamically with js way
            persons = <Persons persons={this.state.persons} clicked={this.deletePersonHandler}
                               changed={this.nameChangedHandler} />;
            //style[':hover'] = {backgroundColor: 'salmon', color: 'black'} // is a string so style[':hover'], if normal object property just put string like above
            //style.backgroundColor='red';
        }


        return (
            <Aux>
                <button onClick={() => {
                    this.setState({showPersons: true})
                }}>Show Persons
                </button>
                <Cockpit
                    title={this.props.title}
                    showPersons={this.state.showPersons}
                    login={this.loginHandler}
                    clicked={this.togglePersonsHandler}
                    persons={this.state.persons}

                />
                <AuthContext.Provider value={this.state.authenticated}>{persons} </AuthContext.Provider>
            </Aux>
        );
        /** use when Radium is there but we're using npm run eject and webpack
         * return (
         <StyleRoot>
         <div className={classes.App}>
         <h1>Hi, Im a React App!</h1>
         <p className={assignedClasses.join(' ')}>hey</p>
         <button className={btnClass} onClick={() => this.togglePersonsHandler()}>
         some button
         </button>
         {persons}
         </div>
         </StyleRoot>
         );
         *
         * **/

        //React lib turns into this
        //return React.createElement('div',null,React.createElement('h1',{className:'App'},'Im react app'));

        /*cannot use if else, a little bit messy, use the {persons}
                {this.state.showPersons ?
                    <div>
                        <Person
                            name={this.state.persons[0].name}
                            age={this.state.persons[0].age}/>
                        <Person
                            name={this.state.persons[1].name}
                            age={this.state.persons[1].age}
                            //click={this.switchNameHandler.bind(this, 'bruh') better
                            changed={this.nameChangedHandler}
                        >My Hobbies is Racing </Person>
                        <Person
                            name={this.state.persons[2].name}
                            age={this.state.persons[2].age}/>
                    </div> : null
                }*/
    }
}

//export default Radium(App); //after installing Radium. higher priority with ();
export default WithClass2(App, classes.App); //after installing Radium. higher priority with ();
// {} always in JSX which will be placed in render(){} to dynamically generate content
// can outsource it to a variable

/** react-scripts - build workflow lib
 * eject in package.json - everything is managed for me to everything is managed for me but I can configure still
 * **/

/** Component Lifecycle
 * Creation - constructor() componentWillMount() componentDidMount() render()
 *          - a. constructor(props) -> creates component and instantiate it call super(props) DO: set up state DONT : Cause side-effects
 *          - b. componentWillMount() -> exists for historic reasons DO: Update state, last-minute optimization DONT Cause side-effects
 *          - c. render() prepare and structure JSX code
 *           -- - - - - - - Rendering componentn -- - - - - -- -
 *          - d. componentDidMount() - DO: Cause Side effects DONT: Update state
 * Update (triggered by parent) - componentWillReceiveProps(nextProps) - DO: Sync state to props DONT: Cause side-effects
 *                              - shouldComponentUpdate(nextProps, nextState) - DO: Decide whether to continue DONT: Cause side effects
 *                              - componentWillUpdate(nextProps, nextState) DO: Sync state to props DONT: Cause side effects
 *                              - render()
 *                              - componentDidUpdate() - DO: Cause side-effects DONT: Update state
 * **/
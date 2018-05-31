import React, {PureComponent, Component} from 'react';
import Person from "./Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside construcotr' + props);
        this.lastPerson = React.createRef();
    }

    componentWillMount() {
        console.log('[Persons.js]Inside componentWillMount');
    }

    componentDidMount() {
        console.log('[Persons.js] did mount');
        this.lastPerson.current.myFocus();
    }

    componentWillReceiveProps(nextProps) {
        console.log('[Persons.js] inside willreceiveprops')
    }

    /*  dont need this since we extends PureComponent
        shouldComponentUpdate(nextProps, nextState){
            console.log('[Persons.js] inside shouldComponentUpdate');
            return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked;
        }*/

    render() {
        console.log('[Persons.js] render');
        return this.props.persons.map((person, index) => {
            return <Person
                    key={person.id}
                    click={() => this.props.clicked(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                    name={person.name}
                    ref={this.lastPerson}
                    age={person.age}/>
        });
    }
}

export default Persons;
/*
return <ErrorBoundary key={person.id}>
                <Person
                    click={() => this.props.clicked(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                    name={person.name} ref={this.lastPerson}
                    age={person.age}/></ErrorBoundary>
* **/
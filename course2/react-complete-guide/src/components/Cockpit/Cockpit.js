import React from 'react';
import classes from './Cockpit.css';
import Aux from '../hoc/Auxilliary';
const cockpit = (props) => {
    let btnClass = classes.Button;
    let assignedClasses = [];
    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(' ');
    }
    if (props.persons.length <= 2) assignedClasses.push(classes.red);
    if (props.persons.length <= 1) assignedClasses.push(classes.bold);

    return (
        <Aux>
            <h1>Hi, Im a {props.title}</h1>
            <p className={assignedClasses.join(' ')}>hey</p>
            <button className={btnClass} onClick={props.clicked}>
                some button
            </button>
            <button onClick={props.login}>Login</button>
        </Aux>
    );
};

export default cockpit;

// <Aux></Aux> here is hoc like a wrapper
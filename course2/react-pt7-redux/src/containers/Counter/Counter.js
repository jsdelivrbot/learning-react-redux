import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/action';
class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storeResults.map(ele=>(
                        <li key={ele.id} onClick={()=>this.props.onDeleteResult(ele.id)}>{ele.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ctr: state.ctr.counter,
        storeResults : state.res.results
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter:()=> dispatch({type:actionTypes.INCREMENT}),
        onDecrementCounter:()=> dispatch({type:actionTypes.DECREMENT}),
        onAddCounter:()=> dispatch({type:actionTypes.ADD, val:10}),
        onSubtractCounter:()=> dispatch({type:actionTypes.SUBTRACT, val:15}),
        onStoreResult:(result)=> dispatch({type:actionTypes.STORE, result:result}),
        //now to store the counter, it has to pass as a payload from global state "props.ctr"
        onDeleteResult:(selectedId)=> dispatch({type:actionTypes.REMOVE, id:selectedId})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
//connect(param1,param2) here is a function to execute and return a hoc.
// param1 = mapStatetoProps = select which pieces of state and maps to props here. Since it returns as
//            a hoc to Counter, this.props.ctr is accessible;
// param2 = mapDispatchToProps = which action to dispatch in this container and access it via props to pass to bottom component
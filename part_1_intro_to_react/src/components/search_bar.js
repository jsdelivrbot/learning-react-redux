import React, {Component} from 'react';
import ReactDom from 'react-dom';

/* video 15-  () > { } is a functional component due to () es6
const SearchBar = ()=>{
    return <input />;
};*/

//extends React.Component to give SearchBar class a bunch of funtioanlties from Reacat.Component class
class SearchBar extends Component {
    //video 17 use constructor to initialize React
    constructor(props) {
        super(props);
        /*video 18 set the state with a Javascript object with property called "term" to be empty first
            only in construcotr we change the state object proeprty e.g. this.state = { term:'', searchTypes:''...}
            outside of constructoor, we use this.setState()
        */
        this.state = {term: ''};
    }

    //render() is to return JSX which is mandatory
    render() {
        //using vanilla JS 'onChange' , using JSX to wrap with {}
        // video 16 here we use es6 function to clean more codes  - return <input onChange={event => console.log(event.target.value)}/>;
        /*video 18 we use this.setState to change the state of the component and never use this.state.term = event.target.value (BAD!)
            using {} to display value like NG uses {{}} , using this.state.term to display and NEVER to manipulate value
        */
        return (
            <div className="search-bar">
                <input onChange={event => this.onInputChange(event.target.value)}/>
                {/*Value of the input : {this.state.term}*/}
            </div>
        )
    }

    /* video 16
        bind it to onChange. onChange= {this.onInputChange}
     */
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;
// when to use class or functional - main functioanlity should be class-based, ccan start with functioanal-based then turn into class-based

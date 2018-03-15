import React, {Component} from 'react';
import {connect} from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators} from 'redux'; //action goes to all reducers in the app

class BookList extends Component{
/** data = redux //view = react //jointgt = react-redux in video 40
 *  take data and inject into react = container (smart component) and uisualyl have its own directory 'containers'
 *  container is a component has a direct access to state by redux
 *  video 41
 *  to be a container, it usually has to be the "most" parent, not really the app.js but here,
 *  book list and book details changes data wheras app.js doesn't and only rendering things
 * **/
    renderList(){
        return this.props.books.map(function(book){
            //looping array always need a key , yunique one, could be index or id
            return (<li key={book.title} className="list-group-item">{book.title}</li>);
        })
    }

    render(){
        //mapStateToProps() returns
        //console.log(this.props.asd) -> returns 123
        return(
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    //whatever is retrned will show up as props inside of booklist
    return {
        books: state.books
    };
}

//anything returned from this function will ned up as props on the BookList containers
function mapDispatchToProps(dispatch){
    //whenever selectBook is called, the result should be passed to all reducers in the app
    return bindActionCreators({selectBook: selectBook}, dispatch);
}

//pass the return values from mapStateToProps into BookList , hence, BookList becomes a container here.
//promoto booklista from a component to a container - it needs to know about this new dispatch method, selectBook.
//Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

/** two notes from video 42
 *  if loading books from remote server, state changes, this container (BookList) will be rendered
 *  using connect, whenever application state changes, the object in state will be assigned as props => this.props.whatever_new_props
 * **/

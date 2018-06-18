import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from "../actions/index";
import {Link} from 'react-router';

class PostsIndex extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.map(ele => {
            return (
                <li className="list-group-item" key={ele.id}>
                    <Link to={"posts/" + ele.id}>
                        <span className="pull-xs-right">{ele.categories}</span>
                        <strong>{ele.title}</strong>
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary"> Add a Post </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts.all
    }
};

/* {fetchPosts:fetchPosts} to replace function below
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch);
}
*/

export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);
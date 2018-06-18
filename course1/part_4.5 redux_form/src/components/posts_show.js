import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions";
import {Link} from 'react-router-dom';

class PostsShow extends Component{
    componentDidMount(){
        this.props.fetchPost(this.props.match.params.id);
        console.log(this.props);
    }

    onDeleteClick(){
        this.props.deletePost(this.props.match.params.id).then(()=>
        {
            this.props.history.push('/')
        });
    }

    render(){
        const {post} = this.props;
        if(!post){
            return <div>Loading..</div>
        }
        return(
            <div>
                <Link to="/">Home</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >Delete post</button>
                <h3>{post.title}</h3>
                <h6>{post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({posts}, ownProps){
    return {post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
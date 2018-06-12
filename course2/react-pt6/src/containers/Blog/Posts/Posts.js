import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() { //usually for fetch
        console.log(this.props);
        axios.get('/posts')
            .then((data) => {
                const posts = data.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({
                    posts: updatedPosts
                });
            })
            .catch((err) => {
                console.log(err);
                //this.setState({error:true});
            })
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id});
        //programmatically navigating
        this.props.history.push({pathname:'/posts/' + id});
    };

    render() {
        let posts = <p style={{textAlign: 'center'}}>Somethign went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(ele => {
                return (
                    <Post title={ele.title} key={ele.id} clicked={() => this.postSelectedHandler(ele.id)}
                          author={ele.author}/>);
                    {/*<Link to={'/posts/' + ele.id} key={ele.id} >
                        <Post title={ele.title} clicked={() => this.postSelectedHandler(ele.id)}
                              author={ele.author}/>
                    </Link> */}

            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;
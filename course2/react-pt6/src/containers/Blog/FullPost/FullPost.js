import React, {Component} from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };
    //like ngOnInit in Angular
    componentDidMount(){
       this.loadData();
    }

    componentDidUpdate(){
        this.loadData();
    }

    loadData(){
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost &&this.state.loadedPost.id !== +this.props.match.params.id)){
                axios.get('/posts/' + this.props.match.params.id)
                    .then((response) => {
                        this.setState({loadedPost: response.data})
                    })
            }
        }
    }

    /* In routing section of the course, we are no longer using it
    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost &&this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts' + this.props.id)
                    .then((response) => {
                        this.setState({loadedPost: response.data})
                    })
            }
        }
    }*/

    /* better approach for the update
    componentDidUpdate(prevProps, prevState) {
        if (this.props.id && (this.props.id !== prevProps.id)) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    console.log('response.data', response.data)
                    this.setState({
                        loadedPost: response.data
                    });
                })
        }

        console.log('this.props in update', this.props)
        console.log('prevProps in update', prevProps)
    }*/

    deletePostHandler = ()=>{
        axios.delete('/posts' + this.props.match.params.id)
            .then((response)=>{

            });
    };

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading.. </p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;
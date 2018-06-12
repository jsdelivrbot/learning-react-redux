import React, {Component} from 'react';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost'; for lazy routing
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink exact activeClassName="active"
                                         activeStyle={{color: '#fa923f', textDecoration: 'underline'}}
                                         to="/posts">Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }} exact>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={()=><h1>Home </h1>}/>*/}
                <Switch>
                    {/*guard here*/this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Redirect exact from="/" to="/posts"/>
                    <Route render={() => <h1>Page not found</h1>}/>
                    {/*<Route path="/" component={Posts}/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;
//Route has path attribute :string
//NavLink activeClassName can reference to own css style
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from "../actions/index";
import {Link} from 'react-router';


class PostNew extends Component{
    //video 92 changes from normal onSubmit(this.props.createPosts) to contextYpes, onSubmit()
    //react sees we declared this contextTypes with PropTypes.object in it, searches the entire tree
    // whether there is 'router' to access.
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props){
        this.props.createPost(props)
            .then(()=>{
                //blog post has been created, navigate user to index - '/'
                //we navigate by calling this.context.router.push(...)
                this.context.router.push('/');
            })
    }

    render(){
        const {fields: {title,categories, content}, handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid? 'has-danger': ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">{title.touched? title.error : ''}</div>
                </div>
                <div className={`form-group ${categories.touched && categories.invalid? 'has-danger': ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="text-help">{categories.touched? categories.error : ''}</div>
                </div>
                <div className={`form-group ${content.touched && content.invalid? 'has-danger': ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                    <div className="text-help">{content.touched? content.error : ''}</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}
//the exact name in the reduxForm config {}
function validate(values){
    const errors ={};
    if(!values.title){
        errors.title = 'Enter a post name'
    }

    if(!values.categories){
        errors.categories = 'Enter categories'
    }
    if(!values.content){
        errors.content =' Enter some content';
    }
    return errors;
}

//connect : first args = mapStateToProps, second args = mapDisaptchToProps
//reduxForm : first args = formconfig, second args = mapStateToProps, third args = mapDisaptchToProps

export default reduxForm({
    form:'PostNewForm',
    fields:['title', 'categories', 'content'],
    validate
},null,{createPost})(PostNew);
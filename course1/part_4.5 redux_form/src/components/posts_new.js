import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from "../actions";
//redux-form v6 way- introducing <Field> with name and component attributes
//Field - doesn't not how to show on screen but knows how to interact with reduxform
//component - visual phase, interacting with user

class PostsNew extends Component{
    //field args has a few event handlers and reserved
    // the 'labeltoShow' is arbitrary prop to pass in <Field>
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.createPost(values).then(()=>this.props.history.push('/'))
    }

    render(){
        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title for Post"
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit Post</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values){
    const errors={};

    if(!values.title){
        errors.title='Enter a title';
    }
    if(!values.categories){
        errors.categories='Enter a categories';
    }
    if(!values.content){
        errors.content='Enter a content';
    }
    return errors;
}


export default reduxForm({
    validate,
    form:'PostsNewForm' // this form has to be FORM not FORMS
})(
    connect(null, {createPost})(PostsNew)
); //this connect() with redux-form v6 is DIFFERENT from v4
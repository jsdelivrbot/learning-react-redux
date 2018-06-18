import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
//redux-form v6 way- introducing <Field> with name and component attributes
//Field - doesn't not how to show on screen but knows how to interact with reduxform
//component - visual phase, interacting with user

class PostsNew extends Component{
    //field args has a few event handlers and reserved
    // the 'labeltoShow' is arbitrary prop to pass in <Field>
    renderField(field){
        return(
            <div className="form-group">
                <label>{field.labelToShow}</label>
                <input className="form-control" type="text" {...field.input}/>
                {field.meta.error}
            </div>
        )
        //{field.meta.error} is automatically added via validate()
    }

    render(){
        return(
            <form>
                <Field
                    labelToShow="Title for Post"
                    name='title'
                    component={this.renderField}
                />
                <Field
                    labelToShow="Categories"
                    name="category"
                    component={this.renderField}
                />
                <Field
                    labelToShow="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit Post</button>
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
        errors.title='Enter a categories';
    }
    if(!values.content){
        errors.title='Enter a content';
    }
    return errors;
}

export default reduxForm({
    form:'PostsNewForm',
    validate
})(PostsNew);
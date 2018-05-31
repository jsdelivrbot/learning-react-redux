import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    };

    componentDidCatch = (err, info) => {
        this.setState({hasError: err, errorMessage: info})
    };

    //if there is an error, return the h1 else just going to the <bla>__here__</<bla>
    render() {
        if (this.state.hasError) {
            return <h1>Somthing went wrong</h1>;
        }else{
            return this.props.children;
        }
    }
}
export default ErrorBoundary;
import React, {Component} from 'react';

/* this is hoc functional component and not stateful
const withClass2 = (WrappedComponent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};*/

// this is hoc functioanl component and stateful, just implement Annonymous class and render() in it
const withClass2 = (WrappedComponent, className) => {
    const WithClass2= class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.ref2} {...this.props}/>
                </div>
            );
        }
    };
    return React.forwardRef((props,ref)=>{
       return <WithClass2 {...props} ref2={ref}/>
    });
    //forwaradedREf = is the name I can pick
};
export default withClass2;

/*
   <WrappedComponent/> to pass all the "passed" props
*  <WrappedComponent {...props}/>
* */

/* forwrdedRef and 16.3 Ref API
* 1. Persons.js passes 'ref' with the React.createRef()
* 2. Since we use HOC WithClass2(Person, className) , we pass the 'ref' from Persons.js and process it in line 14 const withclass= .... think of <WrappedComponent ref=...> is <Person ref=...>
*     because each component has 'ref'.
* 3. React.forwardRef receives two args, and we here use forwardedRef (just a name only) to pass the actual 'ref' from Persons.js to Person.js
* 4. in Person.js, WithClass2(Persons,className), since it's wrapped, and React.forwardRef() executed, behind the scence, forwardedRef will be unwrap and the codes myFocus() will get invoked
* */
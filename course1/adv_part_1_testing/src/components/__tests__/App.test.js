import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

import {shallow} from 'enzyme';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

beforeEach(()=>{
    wrapped = shallow(<App/>);
});

it('does not crash during rendering', () => {
    //here we're using JEST
    //const div = document.createElement('div');
    //ReactDOM.render(<App/>, div);
    //console.log(div.innerHTML);
    // this checks the internal component's implementation which is nasty to test in big app
    // rather, it should only knows having an instance of CommentBox/List
    // expect(div.innerHTML).toContain('Comment Box');

    //enzyme API
    //1. Static - render the given component and return plain HTML - no interaction
    //2. Shallow - render *just* the given component and none of its children. Usually isolated testing. - interaction only the component
    //3. Full DOM - Render the component and all of its children + let us modify it afterwards. - interaction with all the stuffs in the components and children

    //ReactDOM.unmountComponentAtNode(div);

    //here we're using Enzyme
    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('has CommentList',()=>{
    expect(wrapped.find(CommentList).length).toEqual(1);
});
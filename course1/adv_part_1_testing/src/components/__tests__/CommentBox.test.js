import React from 'react';
import CommentBox from 'components/CommentBox';
import Root from 'Root';
//using Full DOM Enzyme API
import {mount} from 'enzyme';

let wrapped;

beforeEach(() => {
    wrapped = mount(<Root><CommentBox/></Root>);
});

afterEach(() => {
    wrapped.unmount();
});

it('has a text area and a button', () => {
    //console.log()
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
    beforeEach(()=>{
        wrapped.find('textarea').simulate('change', {
            target: {value: 'some values'}
        });
        wrapped.update();
    });

    it('able to interact with textarea', () => {
       /* const textArea = wrapped.find('textarea');
        textArea.simulate('change', {
            target: {value: 'some new comments'} // = event(change).target.value but in object format
        }); //simulating an event on textarea
        wrapped.update(); //force re-renders;*/
        expect(wrapped.find('textarea').prop('value')).toEqual('some values');
    });

    it('able to submit and empty the textarea', () => {
        //can uncomment wrapped.update() but it is always better to have it because of asynchronous event

        wrapped.find('form').simulate('submit'); //simulating the submit event
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    })
});
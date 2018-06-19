import {saveComment} from 'actions';
import {SAVE_COMMENT} from "actions/types";

describe('saveComment', ()=>{
   it('has the correct type', ()=>{
       const action = saveComment();
       expect(action.type).toEqual(SAVE_COMMENT);
   });

   it('has a correct payload', ()=>{
       const action = saveComment('new comment');
       expect(action.payload).toEqual('new comment');
   });
});
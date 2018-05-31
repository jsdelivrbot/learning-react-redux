import React from 'react';

const userInput = (props)=>{
    const style={
        margin:'10px',
        padding:'10px',
        border:'1px solid #ff0000'
    };
  return(
      <div>
        <input type='text' style={style} value={props.username} onChange={props.manipulated}/>
      </div>
  );
};

export default userInput;
import React from 'react';
import classes from './Order.css';
const order = (props)=> {
    const ingredients = [];
    for(let iN in props.ingredients){
        ingredients.push({name:iN, amount:props.ingredients[iN]});// transform {a:1, b:1} to [{a:1}, {b:1}];
    }

    const displayIng = ingredients.map(ele=>{
        return <span style={{textTransform:'capitalize', display:'inline-block', margin:'0 8px', border:'1px solid #ccc', padding:'5px' }} key={ele.name}>{ele.name} ({ele.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>{displayIng}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
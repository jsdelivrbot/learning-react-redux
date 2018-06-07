import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ele => {
            return <BuildControl
                added={() => props.ingredientAdded(ele.type)}
                removed={() => props.ingredientRemoved(ele.type)}
                key={ele.label} disabled={props.disabled[ele.type]}
                label={ele.label}/>
        })}
        <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;


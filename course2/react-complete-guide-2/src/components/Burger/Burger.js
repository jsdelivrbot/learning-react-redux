import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
import {withRouter} from 'react-router-dom';
const burger = (props)=>{
    let ingredients = Object.keys(props.ingredients)
        .map(ele=>{
            console.log('first map ' ,ele);
            //console.log(props.ingredients[ele]); returns the value;
            //console.log([...Array(props.ingredients[ele])]) returns [undefined, undefined] based on the value whihc is in props.ingredients[ele]
            return [...Array(props.ingredients[ele])].map((_,i)=>{
                console.log('second map' ,i);
                return <BurgerIngredient key={ele+i} type={ele}/>
            })
        }).reduce((arr,ele)=>{
            console.log(ele);
            return arr.concat(ele);
        }, []);
    if(ingredients.length ===0){
        ingredients= <p>Add some ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);
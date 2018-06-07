import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map((ele, i) => {
            return (
                <li key={i}>
                    <span style={{textTransform: 'capitalize'}}>{ele}</span>: {this.props.ingredients[ele]}
                </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseContinued} btnType={"Success"}>Proceed</Button>
                <Button clicked={this.props.purchaseCancelled} btnType={"Danger"}>Cancel</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
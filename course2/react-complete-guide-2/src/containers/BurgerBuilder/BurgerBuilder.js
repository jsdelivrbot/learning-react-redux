import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {
    /* for this approach
    constructor(props){
        super(props);
        this.states={

        }
    }*/
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
       /* axios.get('https://react-my-burger-ee372.firebaseio.com/ingredients.json')
            .then((data) => {
                this.setState({ingredients: data.data})
            })
            .catch((err) => {
                this.setState({error: true});
            })*/
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ele => {
            return ingredients[ele]
        }).reduce((sum, curr) => {
            return sum + curr;
        }, 0);
        return sum >0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if (this.props.ings!= null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   purchasable={this.updatePurchaseState(this.props.ings)} disabled={disabledInfo}
                                   price={this.props.price}
                                   ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         purchaseCancelled={this.purchaseCancelHandler}
                                         price={this.props.price.toFixed(2)}
                                         purchaseContinued={this.purchaseContinueHandler}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        ings: state.ingredients,
        price : state.totalPrice
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded:(ingName) =>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName }),
        onIngredientRemoved:(ingName) =>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
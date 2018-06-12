import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,
    };

    orderHandler=()=>{
         this.setState({loading: true});
         //alert('Continue');
         const order = {
             ingredients: this.props.ingredients,
             price: this.props.price,
             customer: {
                 name: 'Tc',
                 address: {
                     street: '123 test str',
                     zipCode: '1234',
                     country: 'Germany'
                 },
                 email: 'test@test.com'
             },
             deliveryMethod: 'fastest'
         };
         axios.post('/orders.json', order)
             .then((data) => {
                 this.setState({loading: false});
                 console.log(data);
                 this.props.history.push('/');
             })
             .catch((err) => {
                 this.setState({loading: false});
                 console.log(err);
             });
    };

    render(){
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}> Order</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
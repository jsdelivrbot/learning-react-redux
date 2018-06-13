import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    require: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation:{},
                valid:true
            },
        },
        formIsValid:false,
        loading: false,
    };

    checkValidity(value, rules) {
        let isValid = true;
        if(!rules){
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
        /* if (rules.required && value.trim() === '') return false;
         if (rules.minLength && value.length > rules.minLength) return false;
         if (rules.maxLength && value.length < rules.maxLength) return false;
         return true;*/
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        //alert('Continue');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    changeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };//this clone the orderForm but not the deliveryMethod, email .... inside's value
        const updatedFormEle = {...updatedOrderForm[inputIdentifier]};
        //only cloned deliveryMethod: {
        //                 elementType: 'select',
        //                 elementConfig: {...nope...}
        //                 value: ''
        updatedFormEle.value = event.target.value;
        updatedFormEle.touched = true;
        updatedFormEle.valid = this.checkValidity(updatedFormEle.value, updatedFormEle.validation);
        updatedOrderForm[inputIdentifier] = updatedFormEle;
        let formIsValid=true;
        for(let iId in updatedOrderForm){
            formIsValid = updatedOrderForm[iId].valid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid})
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(ele => (<Input key={ele.id}
                                                     elementType={ele.config.elementType}
                                                     elementConfig={ele.config.elementConfig}
                                                     value={ele.config.value}
                                                     invalid={!ele.config.valid}
                                                     shouldValidate={ele.config.validation}
                                                     touched={ele.config.touched}
                                                     changed={(event) => this.changeHandler(event, ele.id)}
                />))}
                <Button btnType="Success" disabled={!this.state.formIsValid}> Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
import React,{ useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';

const contactData = (props) => {
    const [orderForm,setOrderForm]=useState({
                name :{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value:'',
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched:false
                },
                street :{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value:'',
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched:false
                },
                zipCode :{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'ZIP code'
                    },
                    value:'',
                    validation:{
                        required : true,
                        minLength : 5,
                        maxLength : 5
                    },
                    valid:false,
                    touched:false
                },
                country :{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value:'',
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched:false
                },
                email :{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod :{
                    elementType : 'select',
                    elementConfig : {
                        options : [
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'},
                        ]
                    },
                    value:'fastest',
                    validation:{},
                    valid : true
                }
            }
    );
    const[formIsValid,setFormIsValid] = useState(false);

    const orderHandler=(event)=>{
        event.preventDefault(event);
        //console.log(this.props);
        //this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier];
        }
        const order = {
            ingredients : props.ings,
            price : props.price,
            orderData : formData,
            userId : props.userId
        }
        props.onOrderBurger(order,props.token);
        // axios.post('/orders.json',order)
        //     .then(response=>{
        //         //console.log(response);
        //         this.setState({loading:false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error=>{
        //         //console.log(error);
        //         this.setState({loading:false});
        //     });
    }


    const inputChangeHandler=(event,inputIdentifier)=>{
        // const updatedOrderForm ={
        //     ...this.state.orderForm
        // }
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }(
        const updatedFormElement = updateObject(orderForm[inputIdentifier],{
            value : event.target.value,
            valid : checkValidity(event.target.value,orderForm[inputIdentifier].validation),
            touched : true
        });
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // updatedFormElement.touched=true;
        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier] : updatedFormElement
        })
        //updatedOrderForm[inputIdentifier]=updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        //console.log(updatedFormElement);
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
        //this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config : orderForm[key]
            });
        }
        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=> inputChangeHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>
        );
        if(props.loading)
            form= <Spinner/>
        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        );
}


const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger : (order,token) => dispatch(actions.purchaseBurger(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));
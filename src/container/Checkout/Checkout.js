import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const checkout = (props) => {

        // state={
        //     ingredients:null,
        //     price : 0
        // }
        // componentWillMount(){
        //     this.props.onInitPurchase();
        // }

        //componentWillMount(){
            // const query = new URLSearchParams(this.props.location.search);
            // const ingredients={};
            // let price = 0;
            // for(let param of query.entries()){
            //     //['salad','1'];
            //     if(param[0]==='price')
            //         price=param[1];
            //     else
            //         ingredients[param[0]] = +param[1];
            // }
            // this.setState({ingredients:ingredients,price : price}); 
        //}

        const checkoutCancelledHandler=()=>{
            props.history.goBack();
        }
        const checkoutContinuedHandler=()=>{
            props.history.replace('/checkout/contact-data');
        }
        
            let summary = <Redirect to="/"/>
            if(props.ings){
                const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
                summary=(
                    <div>
                        {purchasedRedirect}
                    <CheckoutSummary ingredients={props.ings}
                    onCheckoutCancel={checkoutCancelledHandler}
                    onCheckoutContinued={checkoutContinuedHandler}
                    />
                    <Route path={props.match.url+'/contact-data'} 
                component={ContactData}/>
                </div>
                );
            }
            return(
                <div>
                {summary} 
                
                 {/* render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/> */}
                {/* component={ContactData} /> */}
                </div>
            );
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase : () => dispatch(orderActions.purchaseInit())
//     }
// }

//export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
export default connect(mapStateToProps)(checkout);
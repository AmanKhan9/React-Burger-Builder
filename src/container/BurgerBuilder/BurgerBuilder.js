import React,{useState, useEffect,useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {useDispatch,useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';



export const burgerBuilder = (props) => {

    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    const [purchasing,setPurchasing] = useState(false);
    
    const dispatch = useDispatch(); 

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients ;
    });
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice ;
    });
    const error = useSelector(state => {
        return state.burgerBuilder.error ;
    });
    const isAuthenticated = useSelector(state => {
        return state.auth.token!==null;
    });
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngridients()),[dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    // state = {
    //     purchasing : false
    //     //loading : false,
    //     //error : false
    // }
    
    // const {onInitIngredients} = props;
    
    useEffect(()=>{
        onInitIngredients();
    },[onInitIngredients]);
    // componentDidMount(){
    //     this.props.onInitIngredients();
    // }
    //componentDidMount(){
        //console.log(this.props);
        //this.props.onInitIngredients();
        // axios.get('https://react-my-burger-7cfca.firebaseio.com/ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients:response.data});
        //         //return response;
        //     })
        //     .catch(error=>{
        //         this.setState({error:true});
        //     });
   // }

    const updatePurchaseState = (ingredients)=> {
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,ele)=>{
                return sum+ele;
            },0);
            return sum>0;
        //this.setState({purchasable : sum>0});
    }

    const purchaseHandler=()=>{
        if(isAuthenticated){
            //this.setState({purchasing:true});
            setPurchasing(true);
        }
        else{
            onSetAuthRedirectPath("/checkout")
            props.history.push("/auth");
        }
        
    }

    const purchaseCancelHandler=()=>{
        //this.setState({purchasing:false});
        setPurchasing(false);
    }

    const purchaseContinueHandler=()=>{
        // alert('You continue');
        // this.setState({loading:true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name : 'Aman Khan',
        //         address : {
        //             street : 'test street',
        //             zipCode : '111111',
        //             country : 'India'
        //         },
        //         email : 'test@test.com'
        //     },
        //     deliveryMethod : 'fastest'
        // }
        // axios.post('/orders.json',order)
        //     .then(response=>{
        //         //console.log(response);
        //         this.setState({loading:false,purchasing:false});
        //     })
        //     .catch(error=>{
        //         //console.log(error);
        //         this.setState({loading:false,purchasing:false});
        //     });
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : '?'+queryString
        // });
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo={
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }
        let burger = error ?<p>Ingredients can't be loaded!</p> :<Spinner/> ; 
        if(ings){
        burger = (
        <Aux>
        <Burger ingredients={ings}/>
            <BuildControls
            ingredientRemoved={onIngredientRemoved}
            ingredientAdded={onIngredientAdded}
            disabled={disabledInfo}
            price={price}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}/>
            </Aux>
        );
        orderSummary = <OrderSummary ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
        />;
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }
        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>


        );
}

// const mapStateToProps = state =>{
//     return {
//         ings : state.burgerBuilder.ingredients,
//         price : state.burgerBuilder.totalPrice,
//         error : state.burgerBuilder.error,
//         isAuthenticated : state.auth.token!==null
//     }
// }

// const mapDispatchToProps = dispatch =>{
//     return {
//         onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients : () => dispatch(actions.initIngridients()),
//         onInitPurchase : () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }

// export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder,axios));
export default  withErrorHandler(burgerBuilder,axios);
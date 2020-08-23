import React, { useEffect,Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
// import Checkout from './container/Checkout/Checkout';
import {Route,Switch, withRouter,Redirect} from 'react-router-dom';
// import Orders from './container/Orders/Orders';
// import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// const asyncCheckout = asyncComponent(()=>{
//   return import('./container/Checkout/Checkout');
// });
// const asyncOrders = asyncComponent(()=>{
//   return import('./container/Orders/Orders');
// });
// const asyncAuth = asyncComponent(()=>{
//   return import('./container/Auth/Auth');
// });
const Checkout = React.lazy(()=>{
  return import('./container/Checkout/Checkout');
});
const Orders = React.lazy(()=>{
  return import('./container/Orders/Orders');
});
const Auth = React.lazy(()=>{
  return import('./container/Auth/Auth');
});


const app = props => {
  // state={
  //   show : true
  // };

    // componentDidMount(){
    //   setTimeout(()=>{
    //     this.setState({show:false});
    //   },5000);  
    // }
    const {onTryAutoSignUp} = props;
    useEffect(()=>{
      onTryAutoSignUp();
    },[onTryAutoSignUp]);
  
    let routes = (
      <Switch>
        {/* <Route path="/auth" component={Auth}/> */}
        <Route path="/auth" render={props=><Auth {...props}/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
    );
    if(props.isAuthenticated){
      routes= (
        <Switch>
          {/* <Route path="/checkout" component={Checkout}/> */}
          {/* <Route path="/orders" component={Orders}/> */}
          <Route path="/checkout" render={props=><Checkout {...props}/>}/>
          <Route path="/orders" render={props=><Orders {...props}/>}/>
          <Route path="/logout" component={Logout}/>
          {/* <Route path="/auth" component={Auth}/> */}
          <Route path="/auth" render={props=><Auth {...props}/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
          {routes}
          </Suspense>
          {/* <BurgerBuilder/>
          <Checkout/> */}
        </Layout>
      </div>
    );
  }

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token!==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(app));

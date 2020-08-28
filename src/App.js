import React, { Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import { Switch, Route, withRouter } from 'react-router-dom';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders'
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as createAction from './store/actions/index'
import { connect } from 'react-redux';



class App extends Component {

  state = {
  
    
}

componentDidMount(){
  this.props.onTryToAutoLogin()

}




render(){
let routes = <Switch>
<Route path ="/signIn"  component={Auth}/>
<Route path="/" exact  component={BurgerBuilder}/>
</Switch>


  if(this.props.isAuthenticated){
    routes = <Switch>
          <Route path="/checkout"  component={Checkout}/>
          <Route path ="/orders"  component={Orders}/>
          <Route path ="/signIn"  component={Auth}/>
          <Route path ="/logout"  component={Logout}/>
          <Route path="/" exact  component={BurgerBuilder}/>
                </Switch>
  }
return(
  <div>
   
  
<Layout>
{routes}
</Layout>

  </div>
)
};
  
}

const mapStateToProps = (state)=>{
  return{
    isAuthenticated : state.auth.tokenId
  }
 
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onTryToAutoLogin: ()=>dispatch(createAction.checkAuthStatus())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App)) 

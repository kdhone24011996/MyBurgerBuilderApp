import React, { Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders'




class App extends Component {

  state = {
  
    
}





render(){
return(
  <BrowserRouter>
  <div>
   
<Layout>
<Switch>
  <Route path='/Checkout' component={Checkout}/>
  <Route path='/' exact component={BurgerBuilder}/>
  <Route Path ='/Orders' exact component={Orders}/>
</Switch>
</Layout>
  
  </div>
  </BrowserRouter>
)
};
  
}

export default App

import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData'
import { Route } from 'react-router-dom'

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:null 
    }

    UNSAFE_componentWillMount(){

       let query = new URLSearchParams(this.props.location.search)
       let ingredients = {}
       let totalPrice = null

       for(let param of query.entries()){

        if(param[0] ==='price'){
            totalPrice = param[1]
            this.setState({totalPrice: totalPrice})
        }
        else{
            ingredients[param[0]] = +param[1]
        }
           
       }
       this.setState({ingredients: ingredients})
    }

    cancledCheckoutHandler =()=>{
        this.props.history.goBack()
    }

    continuedCheckoutHandler =()=>{
        this.props.history.push(this.props.match.path +'/contactData')
    }
    render(){
        return(
            <div>
           <CheckoutSummary ingredients={this.state.ingredients} 
           cancledCheckoutHandler={this.cancledCheckoutHandler}
           continuedCheckoutHandler ={this.continuedCheckoutHandler}
           />

           <Route path ={this.props.match.path +'/contactData'} 
           render ={(props)=>(<ContactData totalPrice={this.state.totalPrice} 
                                ingredients ={this.state.ingredients}
                                {...props}/>)}/>
                                
            </div>
          
        )
    }
}

export default Checkout
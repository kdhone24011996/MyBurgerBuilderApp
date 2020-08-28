import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component{
    
    cancledCheckoutHandler =()=>{
        this.props.history.goBack()
    }

    continuedCheckoutHandler =()=>{
        this.props.history.push(this.props.match.path +'/contactData')
    }
    render(){
        
        let summary;

       if(this.props.ingredients){
           summary =
           <div>
        <CheckoutSummary ingredients={this.props.ingredients} 
        cancledCheckoutHandler={this.cancledCheckoutHandler}
        continuedCheckoutHandler ={this.continuedCheckoutHandler}
        />

        <Route path ={this.props.match.path +'/contactData'}
        component = {ContactData}/>
        </div>
       } 
       else summary = <Redirect to='/'/>

        return summary
    }
}

const mapStateToProps = (state)=>{
    return{
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)
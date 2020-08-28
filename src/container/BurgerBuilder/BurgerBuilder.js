import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'


import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/Burger/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/Burger/UI/Loader/Laoder'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as createActions from '../../store/actions/index'
import { withRouter } from 'react-router-dom'



class BurgerBuilder extends Component{

    state = {
        Loading : false,
    }

    componentDidMount(){
      
            this.props.onInitializeIngredients()                       
    }
    
    

    updatePurchasable = (ingredients)=>{
        const sum = Object.keys(ingredients).map((igkey) =>{
            return ingredients[igkey]
        })

        .reduce((sum,current) =>{
          return  sum = sum+current
        },0)
       
      return sum>=1
    }
    

        updateOrderSummaryShow = ()=>{
            if(this.props.isAuthenticated){
              this.props.onOrderSummaryShow()
            }
            else{
               this.props.history.push('/signIn')
            }
           
          
        }

        cancleShow = () =>{
            this.setState({...this.state,OrderSummaryShow:false})
            this.props.backdropClose()
        }
        
        continueClicked = ()=>{
          this.props.history.push('/Checkout')
          this.props.backdropClose()
        }


        componentDidUpdate(){
            if(this.props.ingredients){
                this.props.onBurgerBuilded(this.updatePurchasable(this.props.ingredients))
            } 
        }

            
    render(){
       
        
        let disabledinfo ={...this.props.ingredients}

        for(let key in disabledinfo){
            disabledinfo[key] =disabledinfo[key] <= 0;
        }

       let show = this.props.error?<p>ingredients could not load</p> :<Loader/>
        let orderSummary

        if(this.props.ingredients){
            show =  <Auxiliary>
            <Burger ingredients = {this.props.ingredients}/>
            <BuildControls addIngredient = {this.props.onAddIngredient}
                            removeIngredient ={this.props.onRemoveIngredient}
                            disabledinfo = {disabledinfo}
                            price = {this.props.price}
                            purchasable = {!this.updatePurchasable(this.props.ingredients)}
                            updateOrderSummaryShow = {this.updateOrderSummaryShow}
                            isAuthenticated = {this.props.isAuthenticated}
                            />
                            </Auxiliary>
                    
                             orderSummary = 
        <OrderSummary ingredients = {this.props.ingredients}
        cancleClicked = {this.cancleShow} 
        continueClicked = {this.continueClicked}
        price = {this.props.price}/>
      
        if(this.state.Loading){
            orderSummary = <Loader/>
        }
        }
      
      
       
        //now disabledinfo will be like {Meat: true, Cheese false ....}
        return(
            <Auxiliary>
                
               <Model  show = {this.props.orderSummaryShow}

                        cancleShow = {this.cancleShow}>
                  {orderSummary}
               </Model>

               {show}
             
            </Auxiliary>
            
        )
    }
}

 const mapStateToProps = (state)=>({
    ingredients: state.burgerBuilder.ingredients,
    price : state.burgerBuilder.TotalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.tokenId,
    backdrop: state.backdrop.backdropShow,
    orderSummaryShow: state.backdrop.orderSummaryShow
 })

 
 const mapDispatcherToProps =(dispatch)=>{
     return{
         onAddIngredient : (igName) =>dispatch(createActions.addIngredients(igName)),
         onRemoveIngredient :(igName)=>dispatch(createActions.removeIngredients(igName)),
        onInitializeIngredients : ()=>dispatch(createActions.initIngredients()),
        onBurgerBuilded : (isBuilded) =>dispatch(createActions.ifBurgerBuilded(isBuilded)),
        backdropShow :()=>dispatch(createActions.backdropShow()),
        backdropClose :()=>dispatch(createActions.backdropClose()),
        onOrderSummaryShow:()=>dispatch(createActions.orderSummaryShow())
     }
 }

export default withRouter(connect(mapStateToProps,mapDispatcherToProps)(withErrorHandler(BurgerBuilder,axios))) ;
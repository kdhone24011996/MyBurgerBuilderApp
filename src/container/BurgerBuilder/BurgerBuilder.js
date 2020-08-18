import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'


import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/Burger/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/Burger/UI/Loader/Laoder'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICE ={
            Meat :50 ,
            Cheese:30,
            Salad :15,
            Bacon :20,
}
class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        TotalPrice: 60,
        purchasable: false,
        OrderSummaryShow: false, 
        Loading : false,
        error:false,
    }

    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response =>{
            this.setState({ingredients: response.data});
        })
       .catch(error =>{
          this.setState({error: error})
       });
        
    }
    
    updatePurchasable = (ingredients)=>{
        const sum = Object.keys(ingredients).map((igkey) =>{
            return ingredients[igkey]
        })

        .reduce((sum,current) =>{
          return  sum = sum+current
        },0)
       
      this.setState({purchasable: sum>=1})
    }
    
    addIngredientHandler = (type) =>{
      let getIngredient =  this.state.ingredients[type]
      let updateIngredient = getIngredient + 1;
      let updatedIngredient = {...this.state.ingredients }
      updatedIngredient[type] = updateIngredient;

     let oldTotalPrice = this.state.TotalPrice;
     let newTotalPrice = oldTotalPrice + INGREDIENT_PRICE[type]
      this.setState({ingredients:updatedIngredient, TotalPrice:newTotalPrice})
      this.updatePurchasable(updatedIngredient)

    }

    removeIngredientHandler = (type) =>{
        let getIngredient = this.state.ingredients[type]
        let updateIngredient = getIngredient -1
        let updatedIngredient = {...this.state.ingredients}
        updatedIngredient[type] =updateIngredient

        let oldTotalPrice = this.state.TotalPrice;
        let newTotalPrice = oldTotalPrice - INGREDIENT_PRICE[type]
         this.setState({ingredients:updatedIngredient, TotalPrice:newTotalPrice})
         this.updatePurchasable(updatedIngredient)

        }

        updateOrderSummaryShow = ()=>{
           this.setState({OrderSummaryShow:true})
        }

        cancleShow = () =>{
            this.setState({OrderSummaryShow:false})
        }
        
        continueClicked = ()=>{
        const queryParam = []

        for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

         queryParam.push('price=' + this.state.TotalPrice)
       
       let queryString = queryParam.join('&')

       this.props.history.push('/Checkout')
        this.props.history.push({
            pathName : '/Checkout',
            search : '?' +queryString
        })
        }

        

    render(){
        
        let disabledinfo ={...this.state.ingredients}

        for(let key in disabledinfo){
            disabledinfo[key] =disabledinfo[key] <= 0;
        }

      let show = this.state.error?<p>ingredients could not load</p> :<Loader/>
        let orderSummary
      
        if(this.state.ingredients){
            show =  <Auxiliary>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls addIngredient = {this.addIngredientHandler}
                            removeIngredient ={this.removeIngredientHandler}
                            disabledinfo = {disabledinfo}
                            price = {this.state.TotalPrice}
                            purchasable = {!this.state.purchasable}
                            updateOrderSummaryShow = {this.updateOrderSummaryShow}
                            />
                            </Auxiliary>
                    
                             orderSummary = 
        <OrderSummary ingredients = {this.state.ingredients}
        cancleClicked = {this.cancleShow} 
        continueClicked = {this.continueClicked}
        price = {this.state.TotalPrice}/>
      
        if(this.state.Loading){
            orderSummary = <Loader/>
        }
        }
      
      
       
        //now disabledinfo will be like {Meat: true, Cheese false ....}
        return(
            <Auxiliary>
               <Model  show = {this.state.OrderSummaryShow}
                        cancleShow = {this.cancleShow}>
                  {orderSummary}
               </Model>

               {show}
             
            </Auxiliary>
            
        )
    }
}


export default withErrorHandler(BurgerBuilder,axios);
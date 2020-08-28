import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../UI/Button/Button'

const OrderSummary = (props)=>{
    
   let summary
   if(props.ingredients){
    summary = Object.keys(props.ingredients).map((igkey) =>{
    
        return <li key = {igkey} style = {{textAlign: "left"}}>{igkey}:{props.ingredients[igkey]}</li>
    })
   }
    
    return(
        <Auxiliary>
            <h3>Order Summary</h3>
            <p style = {{textAlign: "left"}}>tasty burger with following ingredients</p>
            <ul>
                {summary}
            </ul>

         <p><strong> Total Price: {props.price}Rs.</strong></p>
           <Button
                btnType = 'Danger'
                clicked = {props.cancleClicked} 
                > Cancle
            </Button>
           <Button
                btnType = 'Success'
                clicked = {props.continueClicked}
           > Continue
           </Button>

        </Auxiliary>
    )
}

export default OrderSummary;
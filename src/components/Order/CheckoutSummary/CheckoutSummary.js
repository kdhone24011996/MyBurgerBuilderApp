import React from 'react'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.module.css'
import Button from '../../Burger/UI/Button/Button'

const CheckoutSummary =(props)=>{

    return(
        <div className ={classes.CheckoutSummary}>
            <h1>hope u will like this tasty burger.</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.cancledCheckoutHandler}>Cancle</Button>
            <Button btnType='Success' clicked={props.continuedCheckoutHandler}>Continue</Button>

        </div>
    )
}

export default CheckoutSummary
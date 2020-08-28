import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    {label:'Salad' ,type :'Salad'},
    {label:'Cheese' ,type :'Cheese'},
    {label:'Bacon' ,type :'Bacon'},
    {label:'Meat' ,type :'Meat'},

]
const BuildControls = (props) =>(
    <div className = {classes.BuildControls}>
        <p>the price of the current Burger is <strong>{props.price}Rs.</strong></p>
{controls.map((ctr)=>(
    <BuildControl key ={ctr.label} label = {ctr.label} 
    addIngredient ={props.addIngredient}
    removeIngredient = {props.removeIngredient}
    disabledinfo = {props.disabledinfo[ctr.type]}/>
))}
<button className = {classes.OrderButton}
        disabled ={props.purchasable}
        onClick={props.updateOrderSummaryShow}>
       {props.isAuthenticated?'Order Now':<span style ={{boxSizing: 'borderBox'}}>'LoginToOrder'</span>}</button>
    </div>

)

export default BuildControls;
import React from 'react'
import classes from './Order.module.css'

const Order =(props)=>{

    let ingredients =[]
    
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }
console.log(props.ingredients)
    const ingredientsOutput = ingredients.map((ig)=>{
    return <span key ={ig.name}> {ig.name} ({ig.amount}) </span> 
         })
    return(
<div className={classes.Order}>
    <p>Ingredients are : {ingredientsOutput}</p>
    <p>Price is :{props.price}</p>

</div>
    )
}

export default Order
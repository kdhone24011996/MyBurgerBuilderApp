import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'



const Burger = (props) =>{

    let transformedIngradients = Object.keys(props.ingredients).map((igkey) =>{
        return [...Array(props.ingredients[igkey])].map((_,i) =>{
            return <BurgerIngredient key ={igkey + i}  type ={igkey}/>
        })
    } 
    ).reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue)
    },[])

    if (transformedIngradients == 0)
    {
        transformedIngradients = 'please add ingredients'
    }


    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'Bread-Top'/>
            {transformedIngradients}
            <BurgerIngredient type = 'Bread-Bottom'/>


        </div>
    )
}


export default Burger;
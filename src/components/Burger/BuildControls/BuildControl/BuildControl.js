import React from 'react'
import classes from './BuildControl.module.css'
const BuildControl = (props) =>(
    
    <div className = {classes.BuildControl}>
        <div className ={classes.Label}>  {props.label}</div>
         <button onClick ={()=>props.addIngredient(props.label)}className ={classes.More}> more</button> 
         <button onClick ={()=>props.removeIngredient(props.label)}
         disabled ={props.disabledinfo} className ={classes.Less}> less</button> 

    </div>
)

export default BuildControl;
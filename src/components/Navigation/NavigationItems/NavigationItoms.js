import React from 'react'
import classes from './NavigationItoms.module.css'
import NavigationItom from './NavigationItom/NavigationItom'

const NavigationItoms = () =>(
    <ul className ={classes.NavigationItoms}>
       
        <NavigationItom exact link ='/'>Build Your Burger</NavigationItom>
        <NavigationItom  link ='/Orders'>Orders</NavigationItom>


    </ul>
)

export default NavigationItoms
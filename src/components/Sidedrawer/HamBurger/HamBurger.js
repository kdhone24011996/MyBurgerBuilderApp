import React from 'react'
import classes from './HamBurger.module.css'

const HamBurger = (props)=>(
    <div className ={classes.DrawerToggle}
          onClick ={props.toggle}>
       <div></div>
       <div></div>
       <div></div>
       
    </div>
)

export default HamBurger
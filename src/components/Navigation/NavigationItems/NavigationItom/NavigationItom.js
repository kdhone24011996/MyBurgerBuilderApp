import React from 'react'
import classes from './NavigationItom.module.css'
import { NavLink } from 'react-router-dom'

const NavigationItom = (props) =>(
<li className ={classes.NavigationItom}>
    <NavLink to={props.link}
              activeClassName={classes.active}
              exact ={props.exact}>{props.children}</NavLink>
</li>
)

export default NavigationItom
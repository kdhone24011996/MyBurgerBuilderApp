import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItoms from '../NavigationItems/NavigationItoms'
import HamBurger from '../../Sidedrawer/HamBurger/HamBurger'


const Toolbar = (props)=>(
    <header className ={classes.Toolbar}>
        <div><HamBurger toggle ={props.toggle}/></div>
        <Logo height ='80%'/>
        <nav className = {classes.DesktopOnly}>
           <NavigationItoms/>
        </nav>
    </header>
)

export default Toolbar;
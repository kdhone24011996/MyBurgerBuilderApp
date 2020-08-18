import React from 'react'
import classes from './Sidedrawer.module.css'
import NavigationItoms from '../Navigation/NavigationItems/NavigationItoms'
import Logo from '../Logo/Logo'
import Auxiliary from '../../hoc/Auxiliary'
import Backdrop from '../Burger/UI/Backdrop/Backdrop'
import { checkPropTypes } from 'prop-types'
 
const Sidedrawer = (props) =>{

    let attachClasses = [classes.Sidedrawer, classes.close]
    if(props.open){
        attachClasses = [classes.Sidedrawer, classes.open]
    }
    console.log(props.open)
    return(
        <Auxiliary>
            <Backdrop show ={props.open} cancleShow ={props.close}/>
        <div className = {attachClasses.join(' ')}>
            <Logo height = '11%'/>
            <nav>
           <NavigationItoms/>
        </nav>
        </div>
        </Auxiliary>
    )
}

export default Sidedrawer
import React from 'react'
import classes from './Sidedrawer.module.css'
import NavigationItoms from '../Navigation/NavigationItems/NavigationItoms'
import Logo from '../Logo/Logo'
import Auxiliary from '../../hoc/Auxiliary'


 
const Sidedrawer = (props) =>{

    let attachClasses = [classes.Sidedrawer, classes.close]
    if(props.open){
        attachClasses = [classes.Sidedrawer, classes.open]
    }
    
 

    return(
        <Auxiliary>
        <div className = {attachClasses.join(' ')}
        onClick ={props.close}>
            <Logo height = '11%'/>
            <nav>
           <NavigationItoms/>
        </nav>
        </div>
        </Auxiliary>
    )
}

export default Sidedrawer
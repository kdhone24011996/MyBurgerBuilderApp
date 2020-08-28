import React from 'react'
import classes from './NavigationItoms.module.css'
import NavigationItom from './NavigationItom/NavigationItom'
import { connect } from 'react-redux'

 const  NavigationItoms =(props)=>(
     
        <   ul className ={classes.NavigationItoms}>
             <NavigationItom exact link ='/'>Build Your Burger</NavigationItom>
            { props.isAuthenticated?<NavigationItom  link ='/orders'>Orders</NavigationItom>:null}
             {!props.isAuthenticated?<NavigationItom link ='/signIn'>Login</NavigationItom>
             :<NavigationItom link ='/logout'>Logout</NavigationItom>}      

   </ul>
         )
     
    

const mapStateToProps =(state)=>{
    return{

        isAuthenticated : state.auth.tokenId
    }
    
} 


export default connect(mapStateToProps)( NavigationItoms)
import React from 'react'
import classes from './Backdrop.module.css'
import * as createActions from '../../../../store/actions/index'
import { connect } from 'react-redux'

const Backdrop = (props) =>(

   
     props.backdropShow?
<div className = {classes.Backdrop}
 onClick= {()=>props.backdropClose()}
/>  
:null
)

const mapStateToProps = (state)=>{
   return{
      backdropShow : state.backdrop.backdropShow,
   }
}

const mapDispatchToProps = (dispatch)=>{
   return{
      backdropClose: ()=>dispatch(createActions.backdropClose())
   }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Backdrop);


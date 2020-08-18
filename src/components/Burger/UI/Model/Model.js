import React from 'react'
import classes from './Model.module.css'
import Auxiliary from '../../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const Model = (props) =>{
    return(

        <Auxiliary>
            
           <Backdrop show={props.show} cancleShow = {props.cancleShow}/>

    <div className = {classes.Modal}
         style={{
             transform: props.show? 'translateY(0)': 'translateY(-100vh)',
             opacity : props.show?'1':'0'
         }}
         >

        {props.children} 
    </div>
    </Auxiliary>
    )
}

export default Model;
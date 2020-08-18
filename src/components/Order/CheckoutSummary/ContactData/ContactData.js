import React, {Component}from 'react'
import classes from './ContactData.module.css'
import Button from '../../../Burger/UI/Button/Button'
import axios from '../../../../axios-orders'
import Loader from '../../../Burger/UI/Loader/Laoder'

class ContactData extends Component {
    state ={
        name:null,
        email:null,
        address:{
            street: null,
            PostalCode:null,
        },
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault()
            this.setState({Loading:true})
           const order={
               ingredients: this.props.ingredients,
               price: this.props.totalPrice,
               Address: {
                   street: 'sangharsh nagar',
                   city: 'mumbai',
                   pincode: 553434,
               },
               contact :{
                email: 'eradfd@gmail.com',
                mobile: '4543434554545'
               },
               delevery: 'fastest'      
           }

           axios.post('Orders.json',order)
           .then(response=>{
                this.props.history.push('/')
                this.setState({Loading:false})   
           })
          
           .catch(error=>this.setState({Loading:false}))
    }

    render(){

        let form =(
            <form>
                   <input className={classes.Input}type ='text' name='name' placeholder='Name'/>
                   <input className={classes.Input}type ='email' name='email' placeholder='Email'/> 
                   <input className={classes.Input}type ='text' name='postalCode' placeholder='PostalCode'/> 
                   <input className={classes.Input}type ='text' name='street' placeholder='Street'/> 
                    <Button btnType ='Success' clicked={this.orderHandler}>Order</Button>
                </form>
        )
        if(this.state.loading){
            form = <Loader/>  
              }
        
        return(
            <div className ={classes.ContactData}>
                <h1>Enter your contact details</h1>
                {form}
            </div>
        )
    }
}

export default ContactData
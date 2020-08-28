import React, {Component}from 'react'
import classes from './ContactData.module.css'
import Button from '../../../Burger/UI/Button/Button'
import Loader from '../../../Burger/UI/Loader/Laoder'
import Input from '../../../Burger/UI/Input/Input'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/actions/index'
import moment from 'moment'


class ContactData extends Component {
    state ={
       orderForm:{
            name:{
                inputType:'input',
                inputConfig:{
                    type:'text',
                    placeholder: 'name'
                },
                value:'',
                validity:{
                    isRequired:true,
                    hasMinLenght:3,
                    hasMaxLenght:30
                },
                valid:false,
                touched:false
            },
            street: {
                inputType:'input',
                inputConfig:{
                    type:'text',
                    placeholder: 'street'
                },
                value:'',
                validity:{
                    isRequired:true,
                    hasMinLenght:5,
                    hasMaxLenght:30
                },
                valid:false,
                touched:false

            },
            city: {
                inputType:'input',
                inputConfig:{
                    type:'text',
                    placeholder: 'city'
                },
                value:'',
                validity:{
                    isRequired:true,
                    hasMinLenght:3,
                    hasMaxLenght:25
                },
                valid:false,
                touched:false
            },
            pincode:{
                inputType:'input',
                inputConfig:{
                    type:'text',
                    placeholder: 'pinCode'
                },
                value:'',
                validity:{
                    isRequired:true,
                    hasMinLenght:6,
                    hasMaxLenght:6
                },
                valid:false,
                touched:false
            },
           email: {
            inputType:'email',
            inputConfig:{
                type:'text',
                placeholder: 'email Id'
            },
            value:'',
            validity:{
                isRequired:true,
                hasMinLenght:5,
                hasMaxLenght:25,
                hasValidEmail:true,
            },
            valid:false,
            touched:false
           },
           mobile: {
            inputType:'input',
            inputConfig:{
                type:'text',
                placeholder: 'mobile number'
            },
            value:'',
            validity:{
                isRequired:true,
                hasMinLenght:10,
                hasMaxLenght:10
            },
            valid:false,
            touched:false
           },
     
           delevery: {
            inputType:'select',
            inputConfig:{
                options:[{value:'not-selected', displayValue:'delevery'},
                        {value:'urgernt', displayValue:'Urgent'},
                        { value:'regular', displayValue:'Regular'}
            ]
            },
            value:'',
            validity:false
           }      
    },
    formIsValid:false

       }
        
       
    
       checkValidityHandler =(value,validity)=>{
        let isValid =true
        if(validity.isRequired){
            isValid = value.trim() !== '' && isValid
        }
        if(validity.hasMaxLenght){
            isValid = value.length <= validity.hasMaxLenght && isValid
        }
        if(validity.hasMinLenght){
            isValid = value.length >= validity.hasMinLenght && isValid
        }

        if(validity.hasValidEmail){
            if(value.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                isValid = true && isValid
            }
            else{
                isValid = false && isValid
            }
            
        }
        return isValid
       }
       

    orderHandler = (event) =>{
        event.preventDefault()

            let formData ={}

            for(let formElementIdentifier in this.state.orderForm){
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
            }

           const order={
               ingredients: this.props.ingredients,
               price: this.props.totalPrice,
               orderData: formData,
               userId : this.props.userId,
               date : moment().format('MMMM Do YYYY, h:mm:ss a')
           }
           
         let props = {...this.props}
            this.props.orderBurger(order,props)   
                  
              
    }


    inputChangedHandler =(event, elementIdentifier)=>{
       const updatedOrderForm ={...this.state.orderForm}
       const updatedFormElement ={...updatedOrderForm[elementIdentifier]}
        
       updatedFormElement.value = event.target.value
       updatedFormElement.valid =this.checkValidityHandler(updatedFormElement.value, updatedFormElement.validity)
        updatedFormElement.touched = true
        updatedOrderForm[elementIdentifier] = updatedFormElement

        let formIsValid = true

        for(let inputElement in updatedOrderForm){
            formIsValid = updatedOrderForm[inputElement].valid && formIsValid
        }

        this.setState({orderForm:updatedOrderForm , formIsValid:formIsValid})
    }
    render(){

        let orderFormArray =[]

        for(let key in this.state.orderForm){
            orderFormArray.push({
                id:key,
               config:this.state.orderForm[key]
            })
        }
        

        let form =(
            <form>
                   {orderFormArray.map(formElement=>(
                       <Input key={formElement.id}
                              inputType ={formElement.config.inputType}
                              elementConfig ={formElement.config.inputConfig}
                              value ={formElement.config.value}
                              changed ={(event)=>this.inputChangedHandler(event,formElement.id)}
                              invalid ={!formElement.config.valid}
                              shouldValidate ={formElement.config.validity}
                              touched ={formElement.config.touched}
                              />
                   ))}
                   <Button  btnType ='Success' 
                            disabled ={!this.state.formIsValid} 
                            clicked={this.orderHandler}>Order</Button>
                </form>
        )
        if(this.props.loading){
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

const mapStateToProps = (state)=> {
    return{
        ingredients : state.burgerBuilder.ingredients,
        totalPrice :state.burgerBuilder.TotalPrice,
        loading : state.order.loading,
        success : state.order.success,
        userId :state.auth.userId,
       
    }
} 

const mapDispatchToProps = (dispatch)=>{
    return{
         orderBurger : (orderData, props)=>(dispatch(actionCreators.orderBurger(orderData,props)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)
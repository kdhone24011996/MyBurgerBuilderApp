import React , {Component} from 'react'
import classes from './Auth.module.css'
import Input from '../../components/Burger/UI/Input/Input'
import Button from '../../components/Burger/UI/Button/Button'
import Loader from '../../components/Burger/UI/Loader/Laoder'
import * as createActions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Model from '../../components/Burger/UI/Model/Model'

class Auth extends Component {
    
    state={
      
        controls:{
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
                    hasValidEmail:true
                },
                valid:false,
                touched:false
               },

             password: {
                inputType:'password',
                inputConfig:{
                    type:'password',
                    placeholder: 'password'
                },
                value:'',
                validity:{
                    isRequired:true,
                    hasMinLenght:6,
                    hasMaxLenght:21
                },
                valid:false,
                touched:false
               },
        },
        isSignUp:false
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

       



       inputChangedHandler =(event, elementIdentifier)=>{
        const updatedcontrols ={...this.state.controls}
        const updatedFormElement ={...updatedcontrols[elementIdentifier]}
         
        updatedFormElement.value = event.target.value
        updatedFormElement.valid =this.checkValidityHandler(updatedFormElement.value, updatedFormElement.validity)
         updatedFormElement.touched = true
         updatedcontrols[elementIdentifier] = updatedFormElement
 
         let formIsValid = true
 
         for(let inputElement in updatedcontrols){
             formIsValid = updatedcontrols[inputElement].valid && formIsValid
         }
 
         this.setState({controls:updatedcontrols , formIsValid:formIsValid})
     }

     formSubmitHandler =(event)=>{
         event.preventDefault()
         this.props.auth(this.state.controls.email.value, this.state.controls.password.value ,this.state.isSignUp)
     }

     isSignUpSwitchHandler= ()=>{
       
    
        const controls = {...this.state.controls}

       const updateEmail = {...controls['email']}

        updateEmail['value'] = ''

       const updatePassword = {...controls['password']}
        updatePassword['value'] = ''

        controls['email'] = updateEmail
        controls['password'] = updatePassword



        this.setState(prevState=>{
            return {
                isSignUp:!prevState.isSignUp, 
                controls:controls 
            }
        }
           )
     }



     continueClicked = ()=>{
         this.props.history.push('/checkout')
     }

     cancleClicked = ()=>{
         this.props.history.push('/')
     }


    render(){

        let controlsArray =[]

        for(let key in this.state.controls){
            controlsArray.push({
                id:key,
               config:this.state.controls[key]
            })
        }
        let errorMessage
        if(this.props.error){
             errorMessage =<p style= {{color:'red'}}>{this.props.error.message}</p> 
        }
        let form = <Loader/>
        if(!this.props.loading){

            form =(
               
                <form onSubmit={this.formSubmitHandler}>
                       {controlsArray.map(formElement=>(
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
                       > {this.state.isSignUp?'signUp':'SignIn'}</Button>
    
                    </form>
            )

            if(this.props.isAuthenticated){
                form =<Redirect to='/'></Redirect>
                if(this.props.builded){

                    
                 form = <Model show>

                  <OrderSummary cancleClicked={this.cancleClicked} 
                  continueClicked={this.continueClicked}
                  ingredients ={this.props.ingredients} 
                  price ={this.props.price}/>
                 </Model> 
                    
                  
                }
            }
        }

        
          
        
        return(
            <div className ={classes.Auth}>
                 {errorMessage}
                {form}

               { !this.state.isSignUp?<p>don't have an account?</p>:null}
                <Button  btnType ='Danger' 
                         clicked = {this.isSignUpSwitchHandler}
                            
                > {!this.state.isSignUp?'signUp':'SignIn'}</Button> 

            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        loading : state.auth.loading,
        error: state.auth.error,
        builded: state.burgerBuilder.builded,
        isAuthenticated: state.auth.tokenId,
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.TotalPricev
    }
}

const mapDispatchToProps=(dispatch) =>{
    return{
        auth : (email, password, isSignUp)=>dispatch(createActions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Auth)
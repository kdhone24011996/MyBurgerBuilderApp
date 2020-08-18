import React ,{Component} from 'react'
import Model from '../../components/Burger/UI/Model/Model'
import Auxiliary from '../Auxiliary'

 

const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component {                  
 //here withErrorHandler returns an anonymus class which recieves the props of the wrappedComponent. 
 state={
     error:null
 }
componentWillMount(){
   this.reqInterceptors= axios.interceptors.request.use(request=>{
        this.setState({error:null})
        return request
    }
)
   this.responseInterceptors = axios.interceptors.response.use(response => response,error => {
        this.setState({error: error})
        
    })
}

errorHandler =()=>{
    this.setState({error: null})
}

componentWillUnmount(){
    axios.interceptors.request.eject(this.reqInterceptors)
    axios.interceptors.response.eject(this.responseInterceptors)

}

    render(){

        return(
            <Auxiliary>
                <Model show={this.state.error} cancleShow = {this.errorHandler}>
        {this.state.error?this.state.error.message:null}
               </Model>
     <WrappedComponent {...this.props} />
            </Auxiliary>
         
         )
 }
       
   }
    
}

export default withErrorHandler;

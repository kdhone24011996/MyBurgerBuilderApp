import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as createActions from '../../store/actions/index'
import { connect } from 'react-redux'
import Loader from '../../components/Burger/UI/Loader/Laoder'

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrder()
    }

    render(){
        let order = <Loader/>
        if(!this.props.loading){
             order =this.props.orders.map((order)=>{
                return(
            <Order key ={order.id}
                   ingredients ={order.ingredients}
                   price ={order.price}
                   date= {order.date}/>
                   )})
        }
        
        

       
        return(
            <div>
              {order}
            </div>

        )
    
}
}

const mapStateToProps = (state)=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }

}

const mapDipatchToProps = (dispatch)=>{
    return{
        fetchOrder : ()=>dispatch(createActions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(withErrorHandler(Orders,axios))
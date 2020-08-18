import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{

    state ={
        orders:[],
        loading: null
    }
    UNSAFE_componentWillMount(){
        console.log('hello')
        
        let loading = true
        axios.get('/Orders.json')
        .then((response)=>{
            let fetchOrders =[]
            for(let order in response.data){
                fetchOrders.push({
                    ...response.data[order],
                 id : order})
            }
          this.setState({loading:false, orders: fetchOrders})
         
          
        })
        .catch(()=>{
            this.setState({loading:false})
        })
    }

    render(){
        
console.log(this.state.orders)
        let order =this.state.orders.map((order)=>{
            return(
        <Order key ={order.id}
               ingredients ={order.ingredients}
               price ={order.price}/>
               )})

       
        return(
            <div>
              {order}
            </div>

        )
    
}
}

export default withErrorHandler(Orders,axios)
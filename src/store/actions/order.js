
import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const startOrder =()=>{
    return {
      type : actionTypes.START_ORDER,
    } 
}

export const orderSuccessfully =(props)=>{
  props.history.push('/orders')
    return {
      type : actionTypes.ORDERED_SUCCESSFULLY,
    } 
}

export const orderFailed =()=>{
    return {
      type : actionTypes.ORDER_FAILED,
    } 
}


export const orderBurger = (orderData,props)=>{
    return (dispatch , getState)=>{
        dispatch(startOrder())
        
        axios.post('Orders.json?auth='+getState().auth.tokenId,orderData)
           .then(response=>dispatch(orderSuccessfully(props)))
           .catch(error=>dispatch(actionTypes.ORDER_FAILED))
    }
}

export const fetchOrderStart =()=>{
  return {
    type : actionTypes.START_FETCH_ORDER,
  } 
}


export const fetchOrderFailed =()=>{
  return {
    type : actionTypes.FETCH_ORDER_FAILED,
  } 
}

export const fetchOrderSuccess =(response)=>{
  let fetchOrders =[]
  for(let order in response.data){
      fetchOrders.push({
          ...response.data[order],
       id : order})
  }
  return {
    type : actionTypes.FETCH_ORDER_SUCCESSFULLY,
    orders : fetchOrders
  } 
}

export const fetchOrder =()=>{
  return (dispatch,getState) =>{
    dispatch(fetchOrderStart())
    const queryParam = '?auth='+getState().auth.tokenId+ '&orderBy="userId"&equalTo="'+getState().auth.userId+'"'
    axios.get('/Orders.json'+queryParam)
        .then((response)=>{
          dispatch(fetchOrderSuccess(response))
        })
        .catch(()=>{
           dispatch(fetchOrderFailed())
        })
  }
}
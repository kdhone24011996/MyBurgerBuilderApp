import * as actionTypes from '../actions/actionsTypes' 

const initialState={
orders :[],
success : false,
loading : false,
error :false
}

 const reducer =(state = initialState, action)=>{
    
    switch(action.type){

        case actionTypes.ORDERED_SUCCESSFULLY :
            
        return{
            ...state,
            loading : false,
            success :true
        }

        case actionTypes.ORDER_FAILED :
        return{
            ...state,
            loading: false,
            error: true,
            success : false
        }

        case actionTypes.START_ORDER :
        return{
            ...state,
            loading: true,
            error: false,
            success : false
        }


        case actionTypes.FETCH_ORDER_SUCCESSFULLY :
            return{
                ...state,
                loading: false,
                error: false,
                orders:action.orders,
                success:true
        }

        case actionTypes.FETCH_ORDER_FAILED :
            return{
                ...state,
                loading: false,
                error: true,
                success : false
        }


        case actionTypes.START_FETCH_ORDER :
            return{
                ...state,
                loading: true,
                error: false,
                success : false
        }



       default: return state
    }
 }

export default reducer
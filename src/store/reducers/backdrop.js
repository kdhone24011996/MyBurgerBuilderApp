import * as actionTypes from '../actions/actionsTypes'

const initialState ={
    backdropShow :false,
    orderSummaryShow: false
}

const reducer =(state = initialState, action)=>{

    switch(action.type){

        case actionTypes.BACKDROP_SHOW:
            return{
                ...state,
                backdropShow: true
            }

         case actionTypes.BACKDROP_CLOSE:
             return{
                    ...state,
                    backdropShow:false,
                    orderSummaryShow:false
                }

         case actionTypes.ORDER_SUMMARY_SHOW:
             return{
                    ...state,
                   orderSummaryShow: true,
                   backdropShow: true
                }

         

        default: return state
    }
}

export default reducer
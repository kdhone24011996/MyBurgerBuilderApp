import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    userId:null,
    tokenId:null,
    loading:false,
    error:false,
}

const reducer = (state=initialState, action)=>{

    switch(action.type){

        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                userId: action.userId,
                tokenId:action.token,
                loading:false,
                error:false
            }


            case actionTypes.AUTH_START:
                return{
                    ...state,
                    loading:true,
                    error:false
                }
           case actionTypes.AUTH_FAIL:
             return{
                ...state,
                loading:false,
                error:action.error
            }


           case actionTypes.LOGOUT:
             return{
                ...state,
               tokenId:null
            }
            default :return state
    }
}

export default reducer
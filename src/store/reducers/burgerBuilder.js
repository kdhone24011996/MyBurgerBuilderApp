import * as actionTypes from '../actions/actionsTypes'


const initialState ={
    ingredients:null,
    TotalPrice: 60,
    builded: true,
    error:false,
    
}

const INGREDIENT_PRICE ={
    Meat :50 ,
    Cheese:30,
    Salad :15,
    Bacon :20,
}


const reducer = (state= initialState, action)=>{
   
  switch(action.type){
    
    case actionTypes.ADD_INGREDIENT:
        
        return{
            ...state,                  //here i am just distributing all the property of state 
                                       //now i will just override the ingredient property in this distributed state.
            ingredients:{
                ...state.ingredients,  // as to create true de
                [action.igName]: state.ingredients[action.igName]+1,
                
            },
            TotalPrice: state.TotalPrice + INGREDIENT_PRICE[action.igName],
        }

    case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.igName] : state.ingredients[action.igName]-1
            },
            TotalPrice: state.TotalPrice - INGREDIENT_PRICE[action.igName],
        }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                TotalPrice:60,
            }

        case actionTypes.FETCH_ERROR:
            return{
                ...state,
                error : action.error
            }


        case actionTypes.IF_BURGER_BUILDED:
            return{
                ...state,
               builded:action.isBuilded
            }



        default: return state
        
  }
}

export default reducer


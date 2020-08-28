import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const  addIngredients =(igName)=>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        igName:igName
    }
}

export const  removeIngredients =(igName)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        igName:igName
    }
}


export const setIngredients =(ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENTS ,
        ingredients: ingredients
    }
}

export const fetchError = () =>{
    return{
        type : actionTypes.FETCH_ERROR,
        error: true
    }
    
}
export const initIngredients = (ingredients)=>{
    return (dispatch)=>{
        axios.get('/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data))
        })
       .catch(error =>{
         dispatch(fetchError())
       });
        
        
    }
}



export const ifBurgerBuilded = (isBuilded) =>{
    return{
        type : actionTypes.IF_BURGER_BUILDED,
        isBuilded: isBuilded
    }
    
}


import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (userId,token)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token
    }
}


export const authFail = (error)=>{
    
    return{
        type:actionTypes.AUTH_FAIL,
        error: error
    }
}


export const logout = (error)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return{
        type:actionTypes.LOGOUT,
        error: error
    }
}



export const authTimeout =(expirationTime)=>{
    return dispatch =>{
        return setTimeout(()=>{
            return dispatch(logout())
        },expirationTime)
    }

}

export const auth = (email, password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart())

        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaLuD-mhzm4HWTNp3pw_G3Qbs_-CF-kEo'
        if(!isSignUp){
           url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaLuD-mhzm4HWTNp3pw_G3Qbs_-CF-kEo'
        }
        let authData ={
            email: email,
            password: password,
            returnSecureToken:true
        }
        axios.post(url,authData)
        .then((response)=>{
           let expirationDate = new Date( new Date().getTime() + response.data.expiresIn*1000)
           localStorage.setItem('expirationDate',expirationDate)
           localStorage.setItem('userId',response.data.localId)
           localStorage.setItem('token',response.data.idToken)

            dispatch(authTimeout(response.data.expiresIn*1000))
          dispatch(authSuccess(response.data.localId,response.data.idToken))}
            )

            .catch((error)=>dispatch(authFail(error)))
        }
    }


    
    export const checkAuthStatus = ()=>{
        return dispatch=>{
            const expirationDate = new Date(localStorage.getItem('expirationDate')) 
            const userId = localStorage.getItem('userId') 
            const token = localStorage.getItem('token') 

            if(new Date() > expirationDate){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(userId,token))

                const expirationTime = (expirationDate.getTime() - new Date().getTime())
                dispatch(authTimeout(expirationTime))
                
            }
            
        }
    }


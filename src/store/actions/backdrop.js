import * as actionType from  './actionsTypes'


export const backdropShow = ()=>{
return{
    type:actionType.BACKDROP_SHOW
}
}

export const backdropClose = ()=>{
    return{
        type:actionType.BACKDROP_CLOSE
    }
    }

export const orderSummaryShow = ()=>{
        return{
            type: actionType.ORDER_SUMMARY_SHOW
        }
    }

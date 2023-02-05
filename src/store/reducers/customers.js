import * as actionTypes from "../actions/customerActions"

const initialState = {
    customers:[],
    customer:''
}

const customers = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.STORE_CUSTOMERS:
            return {
                ...state,
                customers: action.value
            }
        case actionTypes.ADD_CUSTOMER:
            return {
                ...state,
                customers:state.customers.concat(action.value)
            }
        case actionTypes.DELETE_CUSTOMER:
            const updatedArray=state.customers.filter(customer=> customer.key!==action.value)
            return {
                ...state,
                customers:updatedArray
            }
        case actionTypes.EDIT_CUSTOMER:
            return {
                ...state,
                customer:action.value
            }
    }
    return {
        state,
    }
}

export default customers
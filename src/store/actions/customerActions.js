import React from "react"
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

export const STORE_CUSTOMERS = "STORE_CUSTOMERS"
export const ADD_CUSTOMER = "ADD_CUSTOMER"
export const EDIT_CUSTOMER='EDIT_CUSTOMER'
export const DELETE_CUSTOMER='DELETE_CUSTOMER'

export const saveCustomers = (res) => {
    return {
        type: 'STORE_CUSTOMERS',
        value: res
    }
}
export const editCustomer = (res) =>{
    return{
        type: 'EDIT_CUSTOMER',
        value:res,
    }
}
export const deleteCustomer = (res) =>{
    return{
        type:'DELETE_CUSTOMER',
        value:res
    }
}

export const saveCustomer = (res)=>{
    return{
        type:'ADD_CUSTOMER',
        value:res
    }
}
export const storeCustomers = () => {
    return dispatch => {
        axios.get("customer").then(response=>{
            console.log(response)
            const results = response.data.map(row=>({
                key:row.id,
                firstName:row.firstName,
                lastName:row.lastName,
                phone:row.phone,
                email:row.email,
                createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,
                })
            )
            dispatch(saveCustomers(results))
        })
    }

}

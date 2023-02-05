import axios from "axios";
import {React} from "react";



//delivered Orders
export const saveOneDeliveredOrder =  (res)=>{
    return{
        type:STORE_ONE_DELIVERED_ORDER,
        value:res,
    }
}
export const STORE_ONE_DELIVERED_ORDER = "STORE_ONE_DELIVERED_ORDER"
export const storeOneDeliveredOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/delivered/' + res).then(response=>{
            const order = response.data
            dispatch(saveOneDeliveredOrder(order))
        })
    }
}
export const STORE_DELIVERED_ORDERS = 'STORE_DELIVERED_ORDERS'

export const saveDeliveredOrders = (res) => {
    return {
        type: 'STORE_DELIVERED_ORDERS',
        value: res
    }
}

export const storeDeliveredOrders = () => {
    return dispatch => {
        axios.get('orders/delivered')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Name
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,

                }))
                dispatch(saveDeliveredOrders(answer))

            })
    }

}
// cancelled Orders
export const saveOneCancelledOrder =  (res)=>{
    return{
        type:STORE_ONE_CANCELLED_ORDER,
        value:res,
    }
}
export const STORE_ONE_CANCELLED_ORDER = "STORE_ONE_CANCELLED_ORDER"
export const storeOneCancelledOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/cancelled/' + res).then(response=>{
            const order = response.data
            dispatch(saveOneCancelledOrder(order))
        })
    }
}

export const STORE_CANCELLED_ORDERS = 'STORE_CANCELLED_ORDERS'

export const saveCancelledOrders = (res) => {
    return {
        type: 'STORE_CANCELLED_ORDERS',
        value: res
    }
}

export const storeCancelledOrders = () => {
    return dispatch => {
        axios.get('orders/cancelled')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Name
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,
                }))
                dispatch(saveCancelledOrders(answer))

            })
    }

}
//In transit Orders
export const saveOneInTransitOrder =  (res)=>{
    return{
        type:STORE_ONE_IN_TRANSIT_ORDER,
        value:res,
    }
}
export const STORE_ONE_IN_TRANSIT_ORDER = "STORE_ONE_IN_TRANSIT_ORDER"
export const storeOneInTransitOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/inTransit/' + res).then(response=>{
            const order = response.data
            dispatch(saveOneInTransitOrder(order))
        })
    }
}
export const STORE_IN_TRANSIT_ORDERS = 'STORE_IN_TRANSIT_ORDERS'

export const saveInTransitOrders = (res) => {
    return {
        type: 'STORE_IN_TRANSIT_ORDERS',
        value: res
    }
}

export const storeInTransitOrders = () => {
    return dispatch => {
        axios.get('orders/inTransit')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Name
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,
                }))
                dispatch(saveInTransitOrders(answer))

            })
    }

}

// Pending Orders
export const saveOnePendingOrder =  (res)=>{
    return{
        type:STORE_ONE_PENDING_ORDER,
        value:res,
    }
}
export const STORE_ONE_PENDING_ORDER = "STORE_ONE_PENDING_ORDER"
export const storeOnePendingOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/pending/' + res).then(response=>{
            const order = response.data
            dispatch(saveOnePendingOrder(order))
        })
    }
}

export const STORE_PENDING_ORDERS = 'STORE_PENDING_ORDERS'

export const savePendingOrders = (res) => {
    return {
        type: 'STORE_PENDING_ORDERS',
        value: res
    }
}
export const STORE_ALL_UNREAD_ORDERS = "STORE_ALL_UNREAD_ORDERS";
export const STORE_CHANGE_IN_ORDERS = "STORE_CHANGE_IN_ORDERS";
export const changeInOrders=(res)=>{
    return{
        type: STORE_CHANGE_IN_ORDERS,
        value: res
    }
}
export const saveAllOrders=(res)=>{
    return{
        type: STORE_ALL_UNREAD_ORDERS,
        value: res
    }
}
export const saveAllUnreadOrders = (res) => {
    return dispatch =>{
        axios.get("orders/statusUpdate/allUnread").then(
            success => {
                dispatch(saveAllOrders(success.data.allUnread))
            }
        ).catch(
            error => console.log(error)
        )
    }
}

export const storePendingOrders = () => {
    return dispatch => {
        axios.get('orders/pending')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Name
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,
                }))
                dispatch(savePendingOrders(answer))

            })
    }

}

// refund Orders

export const saveOneRefundOrder =  (res)=>{
    return{
        type:STORE_ONE_REFUND_ORDER,
        value:res,
    }
}
export const STORE_ONE_REFUND_ORDER = "STORE_ONE_REFUND_ORDER"
export const storeOneRefundOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/refund/' + res).then(response=>{
            const order = response.data
            dispatch(saveOneRefundOrder(order))
        })
    }
}

export const STORE_REFUND_ORDERS = 'STORE_REFUND_ORDERS'

export const saveRefundOrders = (res) => {
    return {
        type: 'STORE_REFUND_ORDERS',
        value: res
    }
}
export const storeRefundOrders = () => {
    return dispatch => {
        axios.get('orders/refund')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Nam
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,
                }))
                dispatch(saveRefundOrders(answer))

            })
    }

}

// verified orders


export const saveOneVerifiedOrder =  (res)=>{
    return{
        type:STORE_ONE_VERIFIED_ORDER,
        value:res,
    }
}
export const STORE_ONE_VERIFIED_ORDER = "STORE_ONE_VERIFIED_ORDER"
export const storeOneVerifiedOrder = (res)=> {
    return dispatch=> {
        axios.get('orders/verified/' + res).then(response=>{
            const order = response.data
            dispatch(saveOneVerifiedOrder(order))
        })
    }
}

export const STORE_VERIFIED_ORDERS = 'STORE_VERIFIED_ORDERS'

export const saveVerifiedOrders = (res) => {
    return {
        type: 'STORE_VERIFIED_ORDERS',
        value: res
    }
}
export const storeVerifiedOrders = () => {
    return dispatch => {
        axios.get('orders/verified')
            .then(response => {
                const answer = response.data.map(row => ({
                    //variable row column Name
                    key:row.id,
                    order_no: row.order_no,
                    customer_name: row.customer.firstName + " " + row.customer.lastName,
                    customer_address: row.address,
                    customer_email: row.customer.email,
                    statusId: row.StatusId,
                    isSeen:row.isSeen,
                }))
                dispatch(saveVerifiedOrders(answer))

            })
    }

}

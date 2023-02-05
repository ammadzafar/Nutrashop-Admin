import axios from "axios";
import {message} from "antd";
import {
    storePendingOrders,
    storeVerifiedOrders,
    storeInTransitOrders,
    storeDeliveredOrders,
    storeCancelledOrders, storeRefundOrders
} from "../store/actions/OrderActions/orderActions";
// export const cancelOrder = (id) => {
//     return dispatch => {
//         let cancelled = new FormData()
//         cancelled.append('statusId',3)
//         axios.put('orders/statusUpdate/' + id ,cancelled).then(
//             response=>{
//                 dispatch(addCancelledOrder(id))
//                 message.success('Order Is Marked As cancelled')
//             }).catch(error=>{
//             message.error('error')
//         })
//     }
//
// }

export const orderStatusUpdate = (id,statusId,prevStatusId)=>{
    return dispatch=>{
        let pOrder = new FormData()
        pOrder.append('statusId',statusId)
        axios.put('orders/statusUpdate/' + id ,pOrder)
            .then(
                response=>{
                    if(statusId==1) {
                        dispatch(storePendingOrders())
                    }else if(statusId==2) {
                        dispatch(storeVerifiedOrders())
                    }else if(statusId==6) {
                        dispatch(storeInTransitOrders())
                    }else if(statusId==5) {
                        dispatch(storeDeliveredOrders())
                    }else if(statusId==3) {
                        dispatch(storeCancelledOrders())
                    }else if(statusId==4) {
                        dispatch(storeRefundOrders())
                    }
                    if(prevStatusId ==1){
                        dispatch(storePendingOrders())
                    }else if(prevStatusId ==2){
                        dispatch(storeVerifiedOrders())
                    }else if(prevStatusId ==6){
                        dispatch(storeInTransitOrders())
                    }else if(prevStatusId==5) {
                        dispatch(storeDeliveredOrders())
                    }else if(prevStatusId==3) {
                        dispatch(storeCancelledOrders())
                    }else if(prevStatusId==4) {
                        dispatch(storeRefundOrders())
                    }
                    message.success("Order status is Changed!")
                })
            .catch(error=>{
                message.error('An Error has Occured!!'+error)
            })
    }
}
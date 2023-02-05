import * as actionTypes from '../../actions/OrderActions/orderActions'
import {STORE_CHANGE_IN_ORDERS} from "../../actions/OrderActions/orderActions";

const initialState = {
    deliveredOrders: [],
    deliveredOrder: "",
    cancelledOrders: [],
    cancelledOrder: "",
    inTransitOrders: [],
    inTransitOrder: "",
    pendingOrders: [],
    pendingOrder: "",
    refundOrders: [],
    refundOrder: "",
    verifiedOrders: [],
    verifiedOrder: '',
    allUnread: 0,
}

const Orders = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.STORE_ALL_UNREAD_ORDERS:
            return {
                ...state,
                allUnread: action.value
            }
        case actionTypes.STORE_CHANGE_IN_ORDERS:
            return {
                ...state,
                allUnread: state.allUnread - 1
            }
        case actionTypes.STORE_DELIVERED_ORDERS:
            return {
                ...state,
                deliveredOrders: action.value
            }
        case actionTypes.STORE_ONE_DELIVERED_ORDER:
            return {
                ...state,
                deliveredOrder: action.value
            }
        // cancelled orders reducers
        case actionTypes.STORE_ONE_CANCELLED_ORDER:
            return {
                ...state,
                cancelledOrder: action.value
            }
        case actionTypes.STORE_CANCELLED_ORDERS:
            return {
                ...state,
                cancelledOrders: action.value
            }
        // inTransit Order reducers
        case actionTypes.STORE_IN_TRANSIT_ORDERS:
            return {
                ...state,
                inTransitOrders: action.value
            }
        case actionTypes.STORE_ONE_IN_TRANSIT_ORDER:
            return {
                ...state,
                inTransitOrder: action.value
            }
        case actionTypes.STORE_PENDING_ORDERS:
            return {
                ...state,
                pendingOrders: action.value
            }
        case actionTypes.STORE_ONE_PENDING_ORDER:
            return {
                ...state,
                pendingOrder: action.value
            }
        case actionTypes.STORE_REFUND_ORDERS:
            return {
                ...state,
                refundOrders: action.value
            }
        case actionTypes.STORE_ONE_REFUND_ORDER:
            return {
                ...state,
                refundOrder: action.value
            }
        case actionTypes.STORE_ONE_VERIFIED_ORDER:
            return {
                ...state,
                verifiedOrder: action.value
            }
        case actionTypes.STORE_VERIFIED_ORDERS:
            return {
                ...state,
                verifiedOrders: action.value
            }
    }

    return state
}
export default Orders;
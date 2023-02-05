import * as actionTypes from '../actions/productActions'

const initialState = {
    products: [],
    product: '',
}
const products = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_PRODUCTS:
            return {
                ...state,
                products: action.value
            }
        case actionTypes.EDIT_PRODUCT:
            return {
                ...state,
                products: action.value
            }
        case actionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.value)
            }

        case actionTypes.DELETE_PRODUCT:
            const updatedArray=state.products.filter(product=> product.key!==action.value)
            return {
                ...state,
                products: updatedArray
            }


    }

    return state
}
export default products

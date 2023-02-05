import * as actionTypes from '../actions/brandActions'

const initialState = {
    brands: [],
    brand: '',
}
const brands = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_BRANDS:
            return {
                ...state,
                brands: action.value
            }
        case actionTypes.EDIT_BRAND:
            return {
                ...state,
                brand: action.value
            }
        case actionTypes.ADD_BRAND:
            return {
                ...state,
                brands: state.brands.concat(action.value)
            }
        case actionTypes.DELETE_BRAND:
            const updatedArray=state.brands.filter(brand=> brand.key!==action.value)
            return {
                ...state,
                brands: updatedArray
            }
    }
    return state
}
export default brands

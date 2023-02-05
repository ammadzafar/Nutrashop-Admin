import * as actionTypes from '../actions/variantActions'

const initialState = {
    variants: [],
    variant: '',
}
const variants = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ALL_PRODUCT_VARIANTS:
            return {
                ...state,
                variants: action.value
            }
        case actionTypes.EDIT_VARIANT:
            return {
                ...state,
                variants: action.value
            }
    }

    return state
}
export default variants

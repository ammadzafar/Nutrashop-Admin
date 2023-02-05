import * as actionTypes from '../actions/attributeActions'

const initialState = {
    attributes: [],
    attribute: '',
}
const brands = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ATTRIBUTES:
            return {
                ...state,
                attributes: action.value
            }
        case actionTypes.EDIT_ATTRIBUTES:
            let updatedArrayForEdit = state.attributes.filter(attribute=> attribute.key !== action.value.key)
            return {
                ...state,
                attributes: updatedArrayForEdit.concat(action.value)
            }
        case actionTypes.ADD_ATTRIBUTE:
            return {
                ...state,
                attributes: state.attributes.concat(action.value)
            }
        //
        case actionTypes.DELETE_ATTRIBUTE:
            const updatedArray=state.attributes.filter(attribute=> attribute.key!==action.value)
            return {
                ...state,
                attributes: updatedArray
            }


    }

    return state
}
export default brands

import * as actionTypes from '../actions/moduleActions'

const initialState = {
    modules: [],
}
const modules = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_MODULES:
            return {
                ...state,
                modules: action.value
            }
    }
    return state
}
export default modules

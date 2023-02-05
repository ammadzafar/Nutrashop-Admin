import * as actionTypes from '../actions/roleActions'

const initialState = {
    roles: [],
    role: '',
}
const roles = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ROLES:
            return {
                ...state,
                roles: action.value
            }
        case actionTypes.EDIT_ROLE:
            return {
                ...state,
                roles: action.value
            }
        case actionTypes.ADD_ROLE:
            return {
                ...state,
                roles: state.roles.concat(action.value)
            }
        case actionTypes.DELETE_ROLE:
            const updatedArray=state.roles.filter(role=> role.key!==action.value)
            return {
                ...state,
                roles: updatedArray
            }
    }
    return state
}
export default roles

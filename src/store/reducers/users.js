import * as actionTypes from '../actions/userActions'

const initialState = {
    users: [],
    user: '',
}
const users = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USERS:
            return {
                ...state,
                users: action.value
            }
        case actionTypes.EDIT_USER:
            return {
                ...state,
                users: action.value
            }
        case actionTypes.ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.value)
            }
        case actionTypes.DELETE_USER:
            const updatedArray=state.users.filter(user=> user.key!==action.value)
            return {
                ...state,
                users: updatedArray
            }
    }
    return state
}
export default users

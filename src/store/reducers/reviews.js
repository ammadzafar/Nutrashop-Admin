import * as actionTypes from '../actions/reviewActions'

const initialState = {
    reviews: []
}
const reviews = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_REVIEWS:
            return {
                ...state,
                reviews: action.value
            }
    }
    return state
}
export default reviews

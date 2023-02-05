import * as actionTypes from '../actions/bannerActions'

const initialState = {
    banners: [],
    banner: '',
}
const banners = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_BANNERS:
            return {
                ...state,
                banners: action.value
            }
        case actionTypes.ADD_BANNER:
            return {
                ...state,
                banners: state.banners.concat(action.value)
            }
        case actionTypes.DELETE_BANNER:
            const updatedArray=state.banners.filter(banners=> banners.id!==action.value)
            return {
                ...state,
                banners: updatedArray
            }
    }
    return state
}
export default banners;

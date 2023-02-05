import * as actionTypes from '../actions/menuActions'

const initialState = {
    menus: [],
    menu: '',
    menuCollections: []

}
const menus = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_MENUS:
            return {
                ...state,
                menus: action.value
            }
        case actionTypes.EDIT_MENU:
            let collections = []
            action.value.collections.map((collection) => collections.push(collection.id))
            return {
                ...state,
                menuCollections: collections,
                menu:action.value
            }
        // case actionTypes.EDIT_MENU:
        //     let collections = action.value.collections
        //     let coll=[]
        //     collections.map((collection) => coll.push(collection.id))
        //     return {
        //         ...state,
        //         menu: action.value,
        //         menuCollections: coll
        //     }
        case actionTypes.ADD_MENU:
            return {
                ...state,
                menus: state.menus.concat(action.value)

            }

        case actionTypes.DELETE_MENU:
            const updatedArray=state.menus.filter(menu=> menu.key!==action.value)
            return {
                ...state,
                menus: updatedArray
            }


    }

    return state
}
export default menus

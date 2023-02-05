import * as actionTypes from '../actions/collectionActions'

const initialState = {
    collections: [],
    collection: '',
    parentCollections:'',
    parentIds:[],
}
const brands = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.STORE_COLLECTIONS:
            // const parentColl=action.value.filter(collection=> collection.collectionId==null)
            return {
                ...state,
                collections: action.value,
                // parentCollections: parentColl
            }
        case actionTypes.EDIT_COLLECTION:
            let newData = action.value.parentCollections.length !==0 ?action.value.parentCollections.map(collection =>collection.id):[]
            return {
                ...state,
                collection: action.value,
                parentCollections: [],
                parentIds:newData,
            }
        case actionTypes.ADD_COLLECTION:
            return {
                ...state,
                collections: state.collections.concat(action.value),
            }

        case actionTypes.DELETE_COLLECTION:
            const updatedArray=state.collections.filter(brand=> brand.key!==action.value)
            return {
                ...state,
                collections: updatedArray
            }


    }

    return state
}
export default brands

const redux = require('redux')
const createStore = redux.createStore
const initialState = {
    counter: 0
}
//Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type == 'ADD') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state
}
//Store
const store = createStore(rootReducer)
//subscription
store.subscribe(()=>{
    console.log(store.getState())
})

//dispatching actions
store.dispatch({type: 'ADD', value: 5})


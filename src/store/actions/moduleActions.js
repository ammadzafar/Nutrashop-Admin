import axios from "axios";
import {React} from "react";

export const STORE_MODULES = 'STORE_MODULES'
export const saveAllModules = (res) => {
    return {
        type: 'STORE_MODULES',
        value: res
    }
}

export const storeAllModules = () => {
    return dispatch => {
        axios.get('modules')
            .then(response => {
                console.log(response.data)
                const results = response.data
                dispatch(saveAllModules(results))
            })
    }
}

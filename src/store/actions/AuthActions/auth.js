
import {React} from "react";

export const STORE_AUTH = 'STORE_AUTH'
export const LOGOUT = 'LOGOUT'
export const saveLoginData = (res) => {
    return {
        type: 'STORE_AUTH',
        value: res
    }
}

export const logout=()=>{
    return{
        type:'LOGOUT'
    }
}

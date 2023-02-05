import axios from "axios";
import {React} from "react";

export const STORE_ROLES = 'STORE_ROLES'
export const ADD_ROLE='ADD_ROLE'
export const EDIT_ROLE='EDIT_ROLE'
export const DELETE_ROLE='DELETE_ROLE'
export const saveRoles = (res) => {
    return {
        type: 'STORE_ROLES',
        value: res
    }
}
export const editRole = (res) => {
    return {
        type: 'EDIT_ROLE',
        value: res
    }
}
export const deleteRole = (res) => {
    return {
        type: 'DELETE_ROLE',
        value: res
    }
}
export const storeRoles = () => {
    return dispatch => {
        axios.get('roles')
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id,
                    name:row.name,
                    modules:row.modules.map(mode=>({
                        moduleg:mode.name
                        })
                    )

                }))
                dispatch(saveRoles(results))

            })
    }

}
export const saveRole = (res) => {
    return {
        type: 'ADD_ROLE',
        value: res
    }
}


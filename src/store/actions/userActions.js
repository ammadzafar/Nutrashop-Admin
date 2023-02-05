import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {React} from "react";

export const STORE_USERS = 'STORE_USERS'
export const ADD_USER='ADD_USER'
export const EDIT_USER='EDIT_USER'
export const DELETE_USER='DELETE_USER'
export const saveUsers = (res) => {
    return {
        type: 'STORE_USERS',
        value: res
    }
}
export const editUser = (res) => {
    return {
        type: 'EDIT_USER',
        value: res
    }
}
export const deleteUser = (res) => {
    return {
        type: 'DELETE_USER',
        value: res
    }
}
export const storeUsers = () => {
    return dispatch => {
        axios.get('users')
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id,
                    lastName:row.lastName,
                    firstName: row.firstName,
                    image: row.image,
                    email: row.email,
                    role:row.role.name

                }))
                dispatch(saveUsers(results))

            })
    }

}

export const saveUser = (res) => {
    return {
        type: 'ADD_USER',
        value: res
    }
}


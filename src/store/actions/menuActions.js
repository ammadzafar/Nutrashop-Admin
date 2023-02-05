import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";


export const STORE_MENUS = 'STORE_MENUS'
export const ADD_MENU='ADD_MENU'
export const EDIT_MENU='EDIT_MENU'
export const DELETE_MENU='DELETE_MENU'
export const saveMenus = (res) => {
    return {
        type: 'STORE_MENUS',
        value: res
    }
}
export const editMenu = (res) => {
    return {
        type: 'EDIT_MENU',
        value: res
    }
}
export const deleteMenu = (res) => {
    return {
        type: 'DELETE_MENU',
        value: res
    }
}
//Store Collections
export const storeMenus = () => {
    return dispatch => {
        axios.get('menus')
            .then(response => {
                // console.log(response.data)
                const results = response.data.map(row => ({
                    key: row.id, // I added this line
                    name: row.name,
                    menuCollection: row.Collection !== null ?row.Collection.name :"No Collection",
                    menuCollectionIds: row.Collection !== null ?[row.Collection.id ]:[0],
                    createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,
                }))
                dispatch(saveMenus(results))
            })
    }
}
// save single Menu
export const saveMenu = (res) => {
    return {
        type: 'ADD_MENU',
        value: res
    }
}


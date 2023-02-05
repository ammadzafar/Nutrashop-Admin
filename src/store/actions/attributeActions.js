import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";

export const STORE_ATTRIBUTES = 'STORE_ATTRIBUTES'
export const ADD_ATTRIBUTE='ADD_ATTRIBUTE'
export const EDIT_ATTRIBUTES='EDIT_ATTRIBUTES'
export const DELETE_ATTRIBUTE='DELETE_ATTRIBUTE'
export const saveAttributes = (res) => {
    return {
        type: 'STORE_ATTRIBUTES',
        value: res
    }
}
export const editAttribute = (res) => {
    return {
        type: 'EDIT_ATTRIBUTES',
        value: res
    }
}

export const deleteAttribute = (res) => {
    return {
        type: 'DELETE_ATTRIBUTE',
        value: res
    }
}
// //Store Attributes
export const storeAttributes = () => {
    return dispatch => {
        axios.get('attributes')
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id, // I added this line
                    name: row.name,
                    values:row.values,
                    createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,


                }))
                dispatch(saveAttributes(results))

            })
    }

}
// save single Attribute
export const saveAttribute = (res) => {
    return {
        type: 'ADD_ATTRIBUTE',
        value: res
    }
}


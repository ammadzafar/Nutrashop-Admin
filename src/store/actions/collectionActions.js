import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";
export const STORE_COLLECTIONS = 'STORE_COLLECTIONS'
export const ADD_COLLECTION = 'ADD_COLLECTION'
export const EDIT_COLLECTION = 'EDIT_COLLECTION'
export const DELETE_COLLECTION = 'DELETE_COLLECTION'


export const saveCollections = (res) => {
    return {
        type: 'STORE_COLLECTIONS',
        value: res
    }
}
export const editCollection = (res) => {
    return {
        type: 'EDIT_COLLECTION',
        value: res
    }
}
export const deleteCollection = (res) => {
    return {
        type: 'DELETE_COLLECTION',
        value: res
    }
}
//Store Collections
export const storeCollections = () => {
    return dispatch => {
        axios.get('collections')
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id, // I added this line
                    name: row.name,
                    createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,
                    image: row.image,
                    parentIds: row.parentCollections?row.parentCollections.map(parentCol=>parentCol.id):[0],
                    collectionId:row.collectionId,
                    isPopular:row.isPopular

                }))
                dispatch(saveCollections(results))

            })
    }

}
// save single brand
export const saveCollection = (res) => {
    return {
        type: 'ADD_COLLECTION',
        value: res
    }
}


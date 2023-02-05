import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";
export const STORE_PRODUCTS = 'STORE_PRODUCTS'
export const ADD_PRODUCT='ADD_PRODUCT'
export const EDIT_PRODUCT='EDIT_PRODUCT'
export const DELETE_PRODUCT='DELETE_PRODUCT'
export const saveProducts = (res) => {
    return {
        type: 'STORE_PRODUCTS',
        value: res
    }
}
export const editProduct = (res) => {
    return {
        type: 'EDIT_PRODUCT',
        value: res
    }
}
export const deleteProduct = (res) => {
    return {
        type: 'DELETE_PRODUCT',
        value: res
    }
}
//Store product
export const storeProducts = () => {
    return dispatch => {
        axios.get('products')
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id, // I added this line
                    name: row.name,
                    createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,
                    images: row.images,
                    isPopular:row.isPopular,
                    stock:row.stock

                }))
                dispatch(saveProducts(results))

            })
    }

}
// save single product
export const saveProduct = (res) => {
    return {
        type: 'ADD_PRODUCT',
        value: res
    }
}


import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";
export const STORE_ALL_PRODUCT_VARIANTS = 'STORE_ALL_PRODUCT_VARIANTS'
export const EDIT_VARIANT='EDIT_VARIANT'
export const storeAllProductVariants = (res) => {
    return {
        type: 'STORE_ALL_PRODUCT_VARIANTS',
        value: res
    }
}
export const editVariant = (res) => {
    return {
        type: 'EDIT_VARIANT',
        value: res
    }
}
//Store product
export const storeVariantsWithId = (id) => {
    return dispatch => {
        axios.get('/variants/allProductVariations/'+id)
            .then(response => {
                const results = response.data.map(row => ({
                    key: row.id, // I added this line
                    name: row.name,
                    createdAt: <ReactTimeAgo date={new Date(row.createdAt)} locale="en-US"/>,
                    stock:row.stock

                }))
                dispatch(storeAllProductVariants(results))

            })
    }

}

import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {React} from "react";

export const STORE_REVIEWS = 'STORE_REVIEWS'
export const ADD_REVIEW='ADD_REVIEW'
export const EDIT_REVIEW='EDIT_REVIEW'
export const DELETE_REVIEW='DELETE_REVIEW'
export const saveReviews = (res) => {
    return {
        type: 'STORE_REVIEWS',
        value: res
    }
}
// export const editReview = (res) => {
//     return {
//         type: 'EDIT_REVIEW',
//         value: res
//     }
// }
// export const deleteReview = (res) => {
//     return {
//         type: 'DELETE_REVIEW',
//         value: res
//     }
// }

export const storeReviews = () => {
    return dispatch => {
        alert()
        axios.get('/reviews')
            .then(response => {
                const results = response.data
                dispatch(saveReviews(results))
            }).catch(e=>{
                console.log(e)
        })
    }

}

// export const saveBrand = (res) => {
//     return {
//         type: 'ADD_REVIEW',
//         value: res
//     }
// }


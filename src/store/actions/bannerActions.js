import axios from "axios";

export const STORE_BANNERS = 'STORE_BANNERS'
export const ADD_BANNER='ADD_BANNER'
export const DELETE_BANNER='DELETE_BANNERS'
export const saveBanners = (res) => {
    return {
        type: 'STORE_BANNERS',
        value: res
    }
}

//Store Banners
export const storeBanners = () => {
    return dispatch => {
        axios.get('banners')
            .then(response => {
                console.log(response)
                const results = response.data.map(row => ({
                    id: row.id, // I added this line
                    placeholder: row.placeholder,
                    image: row.image,
                    mobileImage: row.mobileImage,
                    isFeatured: row.isFeatured,
                }))
                dispatch(saveBanners(results))

            })
    }

}
// save single brand
export const saveBanner = (res) => {
    return {
        type: 'ADD_BANNER',
        value: res
    }
}
// Delete Banner
export const deleteBanner = (res) => {
    return {
        type: 'DELETE_BANNER',
        value: res
    }
}


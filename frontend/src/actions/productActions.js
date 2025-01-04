import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} from "../constants/productconstants"
import axios from "axios"

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const response = await axios.get(`/api/products/`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message,
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const response = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
        })
    }
}


export const deleteProduct = (id) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const response = await axios.delete(`/api/products/delete/${id}/`, 
            config
        )
        


        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
                    type: PRODUCT_DELETE_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}
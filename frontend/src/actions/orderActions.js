import  axios  from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from './../constants/orderConstants';
import { CART_CLEAR_ITEM } from '../constants/cartConstants';
import { removeItemsFromLocalStorage } from '../helpers/removeItemsFromLocalStorage';


export const createOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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

        const response = await axios.post(`/api/orders/add/`, 
            order,
            config
        )


        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: CART_CLEAR_ITEM,
            payload: response.data
        })

        removeItemsFromLocalStorage([
            'cartItems'
        ])

        
    } catch (error) {
        dispatch({
                    type: ORDER_CREATE_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const getOrderDetails = (id) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
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

        const response = await axios.get(`/api/orders/${id}/`, 
            config
        )


        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: response.data
        })

     
    } catch (error) {
        dispatch({
                    type: ORDER_DETAILS_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const payOrder = (id,paymentResult) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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

        const response = await axios.put(`/api/orders/${id}/pay/`, 
            paymentResult,
            config
        )


        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: response.data
        })

     
    } catch (error) {
        dispatch({
                    type: ORDER_PAY_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const deliverOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
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

        const response = await axios.put(`/api/orders/${order._id}/deliver/`, 
            {},
            config
        )


        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: response.data
        })

     
    } catch (error) {
        dispatch({
                    type: ORDER_DELIVER_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const getMyOrdersList = () => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
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

        const response = await axios.get(`/api/orders/myorders/`, 
            config
        )


        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: response.data
        })

     
    } catch (error) {
        dispatch({
                    type: ORDER_LIST_MY_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const getOrdersList = () => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
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

        const response = await axios.get(`/api/orders/`, 
            config
        )


        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: response.data
        })

     
    } catch (error) {
        dispatch({
                    type: ORDER_LIST_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}
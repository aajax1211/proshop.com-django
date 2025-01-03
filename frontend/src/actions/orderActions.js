import  axios  from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from './../constants/orderConstants';
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
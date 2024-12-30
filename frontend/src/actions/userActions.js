import axios from "axios";
import { USER_LOGIN_REQUEST, 
    USER_LOGIN_FAIL , 
    USER_LOGIN_SUCCESS , 
    USER_LOGOUT, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST
} from "../constants/userConstants";

export const login = (email, password) => async(dispatch) =>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'content-type':'application/json'
            }
        }

        const response = await axios.post('/api/users/login/', 
            {'username':email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem('userInfo', JSON.stringify(response.data))
    } catch (error) {
        dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}


export const register = (name, email, password) => async(dispatch) =>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers:{
                'content-type':'application/json'
            }
        }

        const response = await axios.post('/api/users/register/', 
            {'name':name,'email':email, 'password': password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem('userInfo', JSON.stringify(response.data))
    } catch (error) {
        dispatch({
                    type: USER_REGISTER_FAIL,
                    payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
                })
    }
}
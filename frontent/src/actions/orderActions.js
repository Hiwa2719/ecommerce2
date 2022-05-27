import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../constants/orderConstants";
import axios from "axios";


export const orderActions = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post('/api/orders/add/', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e
        })
    }
}

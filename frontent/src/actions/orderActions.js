import {
    ORDER_ALL_LIST_FAIL,
    ORDER_ALL_LIST_REQUEST,
    ORDER_ALL_LIST_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {CART_CLEAR_ITEMS} from "../constants/cartConstants";


export const orderCreateAction = (order) => async (dispatch, getState) => {
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

        dispatch({
            type: CART_CLEAR_ITEMS
        })

        localStorage.removeItem('cartItems')

    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.response.data.details
        })
    }
}


export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}/`, config)

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: e.response && e.response.data.detail ?
                e.response.data.detail : e.message,
        })
    }
}


export const payOrderAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(`/api/orders/${id}/pay/`, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.response && e.response.data.detail ? e.response.data.detail : e.message
        })
    }
}

export const getOrderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/orders/', config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: e.response && e.response.data ? e.response.data.detail : e.message
        })
    }
}

export const getAllOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ALL_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/orders/all-orders/', config)

        dispatch({
            type: ORDER_ALL_LIST_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: ORDER_ALL_LIST_FAIL,
            payload: e.response && e.response.data.detail ? e.response.data.detail : e.message
        })
    }
}
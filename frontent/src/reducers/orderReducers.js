import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";


export const orderCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {...state, loading: true}
        case ORDER_DETAIL_SUCCESS:
            return {loading: false, order: action.payload}
        case ORDER_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true}
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}
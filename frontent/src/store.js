import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducers";
import {orderCreateReducers, orderDetailsReducer, orderListReducer, orderPayReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

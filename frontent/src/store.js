import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productCreateReducer,
    productCreateReviewReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer, topRatedProductsReducer
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from "./reducers/userReducers";
import {
    orderCreateReducers,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPayReducer,
    ordersListReducer
} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    topRatedProduct: topRatedProductsReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    ordersList: ordersListReducer,
    orderDelivered: orderDeliverReducer,

    usersList: userListReducer,
    userUpdate: userUpdateReducer,
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

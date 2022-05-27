import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {Link, useNavigate} from "react-router-dom";
import {orderCreateAction} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";


function PlaceOrderPage() {

    const navigate = useNavigate()
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const cart = useSelector(state => state.cart)
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const dispatch = useDispatch()

    const placeOrder = (e) => {
        dispatch(orderCreateAction({
            orderItems: cart.cartItems,
            paymentMethod: cart.paymentMethod,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            shippingAddress: cart.shippingAddress,
        }))
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
        if (!cart.paymentMethod) {
            navigate('/payment/')
        }
    }, [success, navigate])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row">
                <div className="col-md-8">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>
                        </li>
                        <li className="list-group-item">
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </li>
                        <li className="list-group-item">
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ?
                                (
                                    <Message alertType="alert-info">Your Cart is empty</Message>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {cart.cartItems.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <img src={item.image} alt={item.name}
                                                             className="img-fluid rounded"/>
                                                    </div>
                                                    <div className="col">
                                                        <Link to={`/product/${item.product}?redirect='/placeorder/'`}
                                                              className="text-decoration-none text-light">{item.name}</Link>
                                                    </div>
                                                    <div className="col-md-4">
                                                        {item.qty} x ${item.price} =
                                                        ${(item.qty * item.price).toFixed(2)}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h2>Order Summery</h2>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Items:</div>
                                    <div className="col">${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Shipping:</div>
                                    <div className="col">${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Tax:</div>
                                    <div className="col">${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Total Price:</div>
                                    <div className="col">${cart.totalPrice}</div>
                                </div>
                            </li>
                            {error && (
                                <li className="list-group-item">
                                    <Message alertType="alert-danger">{error}</Message>
                                </li>
                            )}
                            <li className="list-group-item">
                                <button className="btn btn-warning w-100" disabled={cart.cartItems.length === 0}
                                        onClick={placeOrder}>
                                    Place Order
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage
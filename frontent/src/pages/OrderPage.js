import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetailsAction} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderPage() {
    const id = useParams().id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {error, order, loading} = orderDetails

    if (!loading && !error) {
        order.itemssPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    useEffect(() => {
        if (!order || order._id !== Number(id)) {
            dispatch(getOrderDetailsAction(id))
        }
    }, [order, id])

    return loading ? <Loader/> : error ? (
            <Message alertType="alert-danger">{error}</Message>
        ) :
        (
            <div>
                <h1>Order: {order._id}</h1>
                <div className="row">
                    <div className="col-md-8">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <h2>Shippnig</h2>
                                <p>
                                    <strong>Shipping: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city},
                                    {' '}
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                            </li>
                            <li className="list-group-item">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                            </li>
                            <li className="list-group-item">
                                <h2>Orders Items</h2>
                                {order.orderItems.length === 0 ?
                                    <Message alertType="alert-info">Order is empty</Message> : (
                                        <ul className="list-group">
                                            {order.orderItems.map((item, index) => (
                                                <li key={index} className="list-group-item">
                                                    <div className="row">
                                                        <div className="col-md-1">
                                                            <img src={item.image} alt={item.name}
                                                                 className="img-fluid rounded"/>
                                                        </div>
                                                        <div className="col">
                                                            <Link to={`/product/${item.product}`}
                                                                  className="text-decoration-none text-dark">{item.name}</Link>
                                                        </div>
                                                        <div className="col-md-4">
                                                            {item.qty} x {item.price} =
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
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">
                                    <h2>Order Summery</h2>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Items:</div>
                                        <div className="col">${order.itemssPrice}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Shipping:</div>
                                        <div className="col">${order.shippingPrice}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Tax:</div>
                                        <div className="col">${order.taxPrice}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Total:</div>
                                        <div className="col">${order.totalPrice}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default OrderPage
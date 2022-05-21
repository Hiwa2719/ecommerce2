import React, {useEffect} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from '../components/Message'
import {addToCart, removeFromCart} from "../actions/cartActions";


const CartPage = () => {
    const productId = useParams().id
    const navigate = useNavigate()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <div className="row cart">
            <div className="col-md-8">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message alertType="alert-info">
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ul className="list-group list-group-flush">
                        {cartItems.map(item => (
                            <li key={item.product} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-2 cart-item">
                                        <img src={item.image} alt={item.name} className="img-fluid rounded"/>
                                    </div>
                                    <div className="col-md-3 cart-item">
                                        <Link to={`/products/${item.product}`}
                                              className="text-decoration-none text-black">{item.name}</Link>
                                    </div>
                                    <div className="col-md-2 cart-item">
                                        ${item.price}
                                    </div>
                                    <div className="col-md-3 cart-item">
                                        <select className="form-select"
                                                onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                value={item.qty}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x, index) => (
                                                    <option key={index} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-1 cart-item">
                                        <button className="btn btn-light"
                                                onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                )}
            </div>
            <div className="col-md-4">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </li>
                    <li className="list-group-item">
                        <button className="btn btn-block btn-dark" disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                            Proceed To Checkout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default CartPage

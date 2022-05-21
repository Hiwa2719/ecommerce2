import React, {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Message} from '../components/Message'
import {addToCart} from "../actions/cartActions";


const CartPage = ()=> {
    const productId = useParams().id
    const navigate  = useNavigate()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log('cartItems: ', cartItems)


    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            cart
        </div>
    )
}


export default CartPage

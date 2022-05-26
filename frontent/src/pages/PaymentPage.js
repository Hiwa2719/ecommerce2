import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";


function PaymentPage() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping/')
    }

    useEffect(() => {
    })

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder/')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <form onSubmit={submitHandler}>
                <h4>Select Method</h4>
                <div className="form-check my-3">
                    <input type="radio" id="paypal" name="paymentMethod" checked className="me-3"
                           onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label className="form-check-label" htmlFor="paypal">
                        PayPal or Credit Card
                    </label>
                </div>

                <input type="submit" value="Continue" className="btn btn-warning"/>
            </form>
        </FormContainer>
    )
}

export default PaymentPage

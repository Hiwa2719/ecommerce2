import React from "react";
import {Link} from "react-router-dom";


function CheckoutSteps({step1, step2, step3, step4}){
    return (
        <ul className="nav justify-content-center mb-4">
            {step1 ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/Login/">Login</Link>
                </li>
            ) :(
                <li className="nav-item nav-link disabled" >
                    Login
                </li>
            )}

            {step2 ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/shipping/">Shipping</Link>
                </li>
            ) :(
                <li className="nav-item nav-link disabled">
                    Shipping
                </li>
            )}

            {step3 ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/Payment/">Payment</Link>
                </li>
            ) :(
                <li className="nav-item nav-link disabled">
                    Payment
                </li>
            )}
            {step4 ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/placeorder/">Place Order</Link>
                </li>
            ) :(
                <li className="nav-item nav-link disabled">
                    Place Order
                </li>
            )}

        </ul>
    )
}


export default CheckoutSteps
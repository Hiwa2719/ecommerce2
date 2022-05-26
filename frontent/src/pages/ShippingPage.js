import React, {useState} from "react";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";
import {useNavigate} from "react-router-dom";


function ShippingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        let data = {
            address: address,
            city: city,
            postalCode: postalCode,
            country: country,
        }
        dispatch(saveShippingAddress(data))
        navigate('/payment/')
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className="form-control mb-3" value={address ? address : ''}
                       onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required/>
                <label htmlFor="city">City</label>
                <input type="text" id="city" className="form-control mb-3" value={city ? city : ''}
                       onChange={(e) => setCity(e.target.value)} placeholder="Enter City" required/>
                <label htmlFor="postalCode">PostalCode</label>
                <input type="text" id="postalCode" className="form-control mb-3" value={postalCode ? postalCode : ''}
                       onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter PostalCode" required/>
                <label htmlFor="country">Country</label>
                <input type="text" id="country" className="form-control mb-3" value={country ? country : ''}
                       onChange={(e) => setCountry(e.target.value)} placeholder="Enter Country" required/>

                <input type="submit" value="Continue" className="btn btn-warning"/>
            </form>
        </FormContainer>
    )
}


export default ShippingPage
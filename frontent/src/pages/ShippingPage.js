import React, {useState} from "react";
import FormContainer from "../components/FormContainer";


function ShippingPage(){
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted')
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className="form-control mb-3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required/>
                <label htmlFor="city">City</label>
                <input type="text" id="city" className="form-control mb-3" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" required/>
                <label htmlFor="postalCode">PostalCode</label>
                <input type="text" id="postalCode" className="form-control mb-3" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter PostalCode" required/>
                <label htmlFor="country">Country</label>
                <input type="text" id="country" className="form-control mb-3" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter Country" required/>

                <input type="submit" value="Continue" className="btn btn-warning"/>
            </form>
        </FormContainer>
    )
}


export default ShippingPage
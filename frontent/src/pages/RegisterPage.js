import React, {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";


function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : false

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect ? redirect : '/')
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message alertType="alert-danger">{error}</Message>}
            {error && error.map((e, index) => <Message key={index} alertType="alert-danger">{e}</Message>)}
            {loading && <Loader/>}
            <form onSubmit={submitHandler}>
                <label htmlFor="name" className="mt-3">Name</label>
                <input type="text" id="name" className="form-control" value={name} placeholder="Enter Name"
                       onChange={(e) => setName(e.target.value)} required/>

                <label htmlFor="email" className="mt-3">Email</label>
                <input type="email" id="email" className="form-control" value={email} placeholder="Enter Email"
                       onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="password" className="mt-3">Password</label>
                <input type="password" id="password" className="form-control" value={password} placeholder="Enter Name"
                       onChange={(e) => setPassword(e.target.value)} required/>

                <label htmlFor="confirmPassword" className="mt-3">Confirm Password</label>
                <input type="password" id="confirmPassword" className="form-control" value={confirmPassword}
                       placeholder="Enter Password Again"
                       onChange={(e) => setConfirmPassword(e.target.value)} required/>

                <input type="submit" value="Register" className="btn btn-primary my-3"/>
            </form>
            <div className="">
                Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login/'}>Sign In</Link>
            </div>
        </FormContainer>
    )
}

export default RegisterPage

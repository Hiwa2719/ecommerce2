import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginPage() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : false
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            navigate(redirect ? redirect : '/')
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message alertType="alert-danger">{error}</Message>}
            {loading && <Loader/>}
            <form onSubmit={submitHandler}>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email"
                       placeholder="Enter Email" value={email}/>
                <label htmlFor="password" className="form-label mt-3">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}
                       id="password" placeholder="Enter Password" value={password}/>
                <input type="submit" className="btn btn-warning mt-3" value="Sign In"/>
            </form>
            <div>
                New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register/'}>Register</Link>
            </div>
        </FormContainer>
    )
}

export default LoginPage
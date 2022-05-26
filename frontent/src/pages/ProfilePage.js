import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserDetail, userUpdateProfile} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";


function ProfilePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {error: detailErrors, loading, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdateProfile)
    const {error: updateErrors, success} = userUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate('/login/')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail('profile'))
            }else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords don\'t match')
        } else {
            dispatch(userUpdateProfile(name, email, password))
            setMessage('')
        }
    }

    return (
        <div className="row">
            {loading && <Loader/>}

            <div className="col-md-3">
                <h2>User Profile</h2>
                {message && <Message alertType="alert-danger">{message}</Message>}
                {detailErrors && detailErrors.map((e, index) => <Message key={index}
                                                                         alertType="alert-danger">{e}</Message>)}
                {updateErrors && updateErrors.map((e, index) => <Message key={index}
                                                                         alertType="alert-danger">{e}</Message>)}
                <form onSubmit={submitHandler}>
                    <label htmlFor="name" className="mt-3">Name</label>
                    <input type="text" id="name" className="form-control" value={name} placeholder="Enter Name"
                           onChange={(e) => setName(e.target.value)} required/>

                    <label htmlFor="email" className="mt-3">Email</label>
                    <input type="email" id="email" className="form-control" value={email} placeholder="Enter Email"
                           onChange={(e) => setEmail(e.target.value)} required/>

                    <label htmlFor="password" className="mt-3">Password</label>
                    <input type="password" id="password" className="form-control" value={password}
                           placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>

                    <label htmlFor="confirmPassword" className="mt-3">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-control" value={confirmPassword}
                           placeholder="Enter Password Again" onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <input type="submit" value="Update" className="btn btn-primary my-3"/>
                </form>
            </div>
            <div className="col-md-9"></div>

        </div>
    )
}

export default ProfilePage

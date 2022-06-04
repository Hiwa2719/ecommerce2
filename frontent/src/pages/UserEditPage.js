import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetail, userUpdateAction} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";


function UserEditPage() {
    const id = useParams().id
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const {error, loading, user} = useSelector(state => state.userDetails)
    const {error: updateError, loading: updateLoading, success: updateSuccess} = useSelector(state => state.userUpdate)

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(userUpdateAction({
            _id: user._id,
            name, email, isAdmin
        }))
    }

    useEffect(() => {
        if (updateSuccess){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/users-list/')
        }

        if (!user || user._id !== Number(id)) {
            dispatch(getUserDetail(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, id, updateSuccess])

    return (
        <div>
            <Link to="/admin/users-list/" className="btn btn-secondary">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader/> : error ? <Message alertType="alert-danger">{error}</Message> : (
                    <form onSubmit={submitHandler}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter name" value={name} id="name"
                               onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter Email" value={email}
                               id="email"
                               onChange={(e) => setEmail(e.target.value)}/>

                        <div className="form-check mb-3">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Is Admin
                            </label>
                            <input className="form-check-input" type="checkbox" checked={isAdmin} id="flexCheckDefault"
                                   onChange={(e) => setIsAdmin(e.target.checked)}/>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </div>
    )
}

export default UserEditPage

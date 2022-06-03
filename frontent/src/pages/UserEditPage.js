import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetail} from "../actions/userActions";


function UserEditPage() {
    const id = useParams().id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const {error, loading, user} = useSelector(state => state.userDetails)

    const submitHandler = () => {
        console.log('submitting')
    }

    useEffect(() => {
        if (!user || user._id !== Number(id)) {
            dispatch(getUserDetail(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, id])

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

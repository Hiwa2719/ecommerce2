import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersListAction} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link, useNavigate} from "react-router-dom";

function UserListPage() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const {error, loading, users} = usersList

    const {userInfo} = useSelector(state => state.userLogin)

    const deleteUser = (id)=>{
        console.log(id)
    }

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
        dispatch(getUsersListAction())
        }else{
            navigate('/login')
        }
    }, [dispatch])

    return (
        <div>
            <h1>Users</h1>
            {
                loading ? <Loader/>
                    : error ?
                        <Message alertType="alert-danger">{error}</Message>
                        : (
                            <table className="table table-sm table-hover table-striped table-responsive">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">ADMIN</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <th scope="row">1</th>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className="fas fa-check" style={{color: 'green'}}></i>
                                        ) : (
                                            <i className="fas fa-check" style={{color: 'red'}}></i>
                                        )}</td>
                                        <td>
                                            <Link to={`/admin/users/${user._id}`} className="btn btn-sm btn-light">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )
            }
        </div>
    )
}

export default UserListPage

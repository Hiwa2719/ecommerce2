import React from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../actions/userActions'
import {USER_DETAILS_RESET} from "../constants/userConstants";

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        dispatch(logout())
        dispatch({type: USER_DETAILS_RESET})
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">ZagrosShop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart/">
                                    <i className="fas fa-shopping-cart text-light"></i> Cart</Link>
                            </li>
                            {
                                userInfo ?
                                    (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {userInfo.name}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link className="dropdown-item" to="/profile/">Profile</Link></li>
                                                <li className="dropdown-item" onClick={logoutHandler}>Logout</li>
                                            </ul>
                                        </li>) :
                                    (<li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login/">
                                            <i className="fas fa-user text-light"></i> Login</Link>
                                    </li>)
                            }
                            {userInfo && userInfo.isAdmin && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="admin-menu"
                                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admin
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/admin/users-list/">Users</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/products-list/">Products</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/orders-list/">Orders</Link></li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

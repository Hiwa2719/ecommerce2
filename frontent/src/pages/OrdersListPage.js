import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link, useNavigate} from "react-router-dom";
import {getAllOrdersAction} from "../actions/orderActions";

function OrdersListPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {error, loading, orders} = useSelector(state => state.ordersList)

    const {userInfo} = useSelector(state => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllOrdersAction())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo])

    return (
        <div>
            <h1>Orders</h1>
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
                                    <th scope="col">USER</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL PRICE</th>
                                    <th scope="col">PAID</th>
                                    <th scope="col">DELIVERED</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <th scope="row">1</th>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            order.paidAt
                                        ) : (
                                            <i className="fas fa-check" style={{color: 'red'}}></i>
                                        )}</td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt
                                        ) : (
                                            <i className="fas fa-check" style={{color: 'red'}}></i>
                                        )}</td>

                                        <td>
                                            <Link to={`/order/${order._id}/`} className="btn btn-sm btn-outline-dark">
                                                Details
                                            </Link>
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

export default OrdersListPage

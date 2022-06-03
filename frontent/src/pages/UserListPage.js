import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersListAction} from "../actions/userActions";

function UserListPage() {

    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const {error, loading, users} = usersList

    useEffect(()=>{
        dispatch(getUsersListAction())
    }, [dispatch])

    return (
        <div>
            <h1>Users</h1>
        </div>
    )
}

export default UserListPage

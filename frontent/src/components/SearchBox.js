import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";


function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation()

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}`)
        }else{
            navigate(location.pathname)
        }
    }

    return (
        <form className="d-flex" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" placeholder="Search" value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    )
}

export default SearchBox

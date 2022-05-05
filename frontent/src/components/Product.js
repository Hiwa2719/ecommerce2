import React from "react";
import Rating from '../components/Rating'
import {Link} from "react-router-dom";


const Product = ({product}) => {
    return (
        <div className="card my-3">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} className="card-img-top" alt="..."/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`} className="text-decoration-none text-black ">
                    <h5 className="card-title">{product.name}</h5>
                </Link>
                <div className="card-text">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </div>
                <h3 className="card-text">${product.price}</h3>
            </div>
        </div>
    )
}

export default Product

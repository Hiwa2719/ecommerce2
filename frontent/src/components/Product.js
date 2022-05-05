import React from "react";
import {Link} from 'react-router-dom'


const Product = ({product}) => {
    return (
        <div className="card my-3">
            <a href={`/product/${product._id}`}>
                <img src={product.image} className="card-img-top" alt="..."/>
            </a>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.rating} from {product.numReviews}</p>
                <p className="card-text">${product.price}</p>
            </div>
        </div>
    )
}

export default Product

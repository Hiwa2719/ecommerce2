import React from "react";
import Rating from '../components/Rating'


const Product = ({product}) => {
    return (
        <div className="card my-3">
            <a href={`/product/${product._id}`}>
                <img src={product.image} className="card-img-top" alt="..."/>
            </a>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </p>
                <h3 className="card-text">${product.price}</h3>
            </div>
        </div>
    )
}

export default Product

import React from "react";
import {Link, useParams} from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'


const ProductPage = () => {
    const id = useParams().id
    const product = products.find((p) => p._id == id)
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt=""/>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h3>{product.name}</h3>
                        </li>
                        <li className="list-group-item">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </li>
                        <li className="list-group-item">
                            Price: ${product.price}
                        </li>
                        <li className="list-group-item">
                            Description: {product.description}
                        </li>
                    </ul>
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Price</div>
                                    <div className="col"><strong>{product.price}</strong></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Status</div>
                                    <div className="col">
                                        {product.countInStock ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <button className="w-100 btn btn-dark" disabled={product.countInStock == 0 } >Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage

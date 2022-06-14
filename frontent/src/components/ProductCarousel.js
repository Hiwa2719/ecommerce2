import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopRatedProductsAction} from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import {Link} from "react-router-dom";


function ProductCarousel() {
    const dispatch = useDispatch()

    const {loading, error, products} = useSelector(state => state.topRatedProducts)

    useEffect(() => {
        console.log('useEffect')
        dispatch(getTopRatedProductsAction())
    }, [])

    return (
        loading ? <Loader/>
            : error ? <Message alertType="alert-danger">{error}</Message>
                : (
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner bg-dark rounded">
                            {products.map((product, index) => (
                                <div key={product._id} className={`carousel-item ${index === 0 && 'active'} pt-5`}>
                                    <img src={product.image} className="d-block img-fluid w-50 rounded-circle mx-auto" alt={product.name}/>
                                    <div className="d-block text-center mt-3 mb-5 text-light">
                                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                                            <h5>{product.name}</h5>
                                        </Link>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )
    )
}

export default ProductCarousel
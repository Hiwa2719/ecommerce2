import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, productCreateReviewAction} from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";


const ProductPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const {userInfo} = useSelector(state => state.userLogin)
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const {
        loading: reviewLoading,
        error: reviewError,
        success: reviewSuccess
    } = useSelector(state => state.productCreateReview)
    const id = useParams().id

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(productCreateReviewAction(product._id, {rating, comment}))
    }

    useEffect(() => {
        if (reviewSuccess) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
    }, [dispatch, id, reviewSuccess])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {
                loading ?
                    <Loader/>
                    : error ?
                        <Message alertType="alert-danger">{error}</Message>
                        :
                        <div>
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
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                    color={'#f8e825'}/>
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
                                            {
                                                product.countInStock > 0 && (
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col">Qty</div>
                                                            <div className="col">
                                                                <select className="form-select"
                                                                        onChange={e => setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map((x, index) => (
                                                                            <option key={index}
                                                                                    value={x + 1}>{x + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>)
                                            }
                                            <li className="list-group-item">
                                                <button className="w-100 btn btn-dark" disabled={product.countInStock === 0}
                                                        onClick={addToCartHandler}>Add
                                                    to
                                                    Cart
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h4>Write a review</h4>

                                            {reviewLoading && <Loader/>}
                                            {reviewSuccess && <Message alertType="alert-success">Review Submitted</Message>}
                                            {reviewError && <Message alertType="alert-danger">{reviewError}</Message>}

                                            {userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                    <label htmlFor="rating">Rating</label>
                                                    <select className="form-select" id="rating"
                                                            onChange={e => setRating(e.target.value)}>
                                                        <option value="">Select ....</option>
                                                        <option value="1">1 - Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Good</option>
                                                        <option value="4">4 - Very Good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </select>

                                                    <label htmlFor="comment">Review</label>
                                                    <textarea className="form-control"
                                                              id="comment"
                                                              placeholder="Leave your review here"
                                                              value={comment}
                                                              onChange={(e) => setComment(e.target.value)}
                                                              style={{"height": "100px"}}>
                                                            </textarea>

                                                    <button className="btn btn-warning mt-2"
                                                            disabled={reviewLoading}
                                                            type="submit">Submit
                                                    </button>
                                                </form>
                                            ) : (
                                                <Message alertType="alert-info">
                                                    Please <Link to={`/login/?next=product/${product._id}`}>
                                                    Login
                                                </Link> to
                                                    write a review
                                                </Message>
                                            )}
                                        </li>
                                    </div>
                                    {product.reviews.length === 0 ?
                                        <Message alertType="alert-info">No Reviews</Message> : (
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <h3>Reviews</h3>
                                                </li>
                                                {product.reviews.map(review => (
                                                    <li className="list-group-item" key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating value={review.rating} color="#f8e825"/>
                                                        <p>{review.createdAt}</p>
                                                        <p>{review.comment}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </div>
                            </div>
                        </div>

            }
        </div>
    )
}

export default ProductPage

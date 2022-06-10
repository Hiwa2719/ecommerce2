import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProductDetails, productUpdateAction} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";


function ProductEditPage() {
    const id = useParams().id
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(undefined)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const {error, loading, product} = useSelector(state => state.productDetails)
    const {error: updateError, loading: updateLoading, success} = useSelector(state => state.productUpdate)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(productUpdateAction({
            _id: product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }

    useEffect(() => {
        if (success) {
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            navigate('/admin/products-list/')
        }

        if (!product || product._id !== Number(id)) {
            dispatch(listProductDetails(id))
        } else {
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product, id, success])

    return (
        <div>
            <Link to="/admin/products-list/" className="btn btn-secondary">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {updateLoading && <Loader/>}
                {updateError && <Message alertType="alert-danger">{updateError}</Message> }

                {loading ? <Loader/> : error ? <Message alertType="alert-danger">{error}</Message> : (
                    <form onSubmit={submitHandler}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter Name" value={name} id="name"
                               onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control mb-3" placeholder="Enter Price" value={price}
                               id="price"
                               onChange={(e) => setPrice(Number(e.target.value))}/>

                        <label htmlFor="image">Image</label>
                        <div className="small text-secondary">currently: {product.image}</div>
                        <input type="file" className="form-control mb-3" placeholder="Enter Image"
                               id="image"
                               onChange={(e) => setImage(e.target.files[0])}/>

                        <label htmlFor="brand">Brand</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter Brand" value={brand}
                               id="brand"
                               onChange={(e) => setBrand(e.target.value)}/>

                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter Category" value={category}
                               id="category"
                               onChange={(e) => setCategory(e.target.value)}/>

                        <label htmlFor="countInStock">CountInStock</label>
                        <input type="number" className="form-control mb-3" placeholder="Enter CountInStock"
                               value={countInStock} id="countInStock"
                               onChange={(e) => setCountInStock(Number(e.target.value))}/>

                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter Description"
                               value={description} id="description"
                               onChange={(e) => setDescription(e.target.value)}/>

                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </div>
    )
}

export default ProductEditPage

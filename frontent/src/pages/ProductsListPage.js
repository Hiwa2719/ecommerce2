import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link, useNavigate} from "react-router-dom";
import {listProducts, productCreateAction, productDeleteAction} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";


function ProductsListPage() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {error, loading, products} = useSelector(state => state.productList)

    const {
        loading: deleteLoading,
        error: deleteError,
        success: deleteSuccess
    } = useSelector(state => state.productDelete)

    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
        product: createdProduct
    } = useSelector(state => state.productCreate)

    const {userInfo} = useSelector(state => state.userLogin)

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product')) {
            dispatch(productDeleteAction(id))
        }
    }

    const createProductHandler = () => {
        dispatch(productCreateAction())
    }

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (createSuccess) {
            navigate(`/admin/products-list/edit/${createdProduct._id}`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, userInfo, navigate, deleteSuccess, createdProduct])

    return (
        <div>
            <div className="row align-items-center">
                <div className="col">
                    <h1>Products</h1>
                </div>
                <div className="col text-end">
                    <button className="my-3 btn btn-outline-dark" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </button>
                </div>
            </div>

            {deleteLoading && <Loader/>}
            {deleteError && <Message alertType='alert-danger'>{deleteError}</Message>}

            {createLoading && <Loader/>}
            {createError && <Message alertType='alert-danger'>{createError}</Message>}

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
                                    <th scope="col">NAME</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">CATEGORY</th>
                                    <th scope="col">BRAND</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <th scope="row">1</th>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <Link to={`/admin/products-list/edit/${product._id}`}
                                                  className="btn btn-sm btn-light">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={() => deleteProduct(product._id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
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

export default ProductsListPage

import Product from '../components/Product'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from '../components/Loader'
import Message from "../components/Message";
import {useLocation} from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


const Home = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = location.search ? location.search : ''

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {
                loading ? <Loader/>
                    : error ? <Message alertType="alert-danger">{error}</Message>
                        :
                        <div>
                            <div className="row">
                                {
                                    products.map(product => (
                                        <div key={product['_id']} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                            <Product product={product}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <Paginate page={page} keyword={keyword} pages={pages}/>
                        </div>
            }
        </div>
    )
}


export default Home

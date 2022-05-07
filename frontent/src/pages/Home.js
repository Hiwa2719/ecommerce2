import Product from '../components/Product'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from '../components/Loader'
import Message from "../components/Message";


const Home = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {
                loading ? <Loader/>
                    : error ? <Message alertType="alert-danger">{error}</Message>
                        :
                        <div className="row">
                            {
                                products.map(product => (
                                    <div key={product['_id']} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                        <Product product={product}/>
                                    </div>
                                ))
                            }
                        </div>
            }
        </div>
    )
}


export default Home

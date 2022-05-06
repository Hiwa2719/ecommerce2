import Product from '../components/Product'
import axios from 'axios'
import React, {useEffect, useState} from "react";


const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('/api/products/')
            .then(response => {
                setProducts(response.data)
            })
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <div className="row">
                {
                    products.map(product => (
                        <div key={product['_id']} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <Product product={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Home

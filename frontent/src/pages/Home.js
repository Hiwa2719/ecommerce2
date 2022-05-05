import products from '../products'
import Product from '../components/Product'
const Home = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <div className="row">
                {
                    products.map(product => (
                        <div key={product['_id']} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <Product product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Home

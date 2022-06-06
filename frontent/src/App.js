import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductsListPage from "./pages/ProductsListPage";


function App() {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/product/:id" element={<ProductPage/>}/>
                        <Route path="/cart/:id" element={<CartPage/>}/>
                        <Route path="/cart/" element={<CartPage/>}/>
                        <Route path="/login/" element={<LoginPage/>}/>
                        <Route path="/register/" element={<RegisterPage/>}/>
                        <Route path="/profile/" element={<ProfilePage/>}/>
                        <Route path="/shipping/" element={<ShippingPage/>}/>
                        <Route path="/payment/" element={<PaymentPage/>}/>
                        <Route path="/placeorder/" element={<PlaceOrderPage/>}/>
                        <Route path="/order/:id" element={<OrderPage/>}/>
                        <Route path="/admin/users-list/" element={<UserListPage/>}/>
                        <Route path="/admin/users-list/edit/:id/" element={<UserEditPage/>}/>
                        <Route path="/admin/products-list/" element={<ProductsListPage/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;

import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";


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
                    </Routes>
                </div>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;

import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'


function App() {
    return (
        <div>
            <Header/>
            <main className="py-3">
                <div className="container">
                   <Home/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;

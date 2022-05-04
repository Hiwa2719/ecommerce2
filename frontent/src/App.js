import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div>
            <Header/>
            <main className="py-3">
                <div className="container">
                    <h1>Welcome</h1>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;

import logo from "./logo.svg";
import ProductDetail from "./js/Product/ProductDetail";
import MainContent from "./js/MainContent/MainContent";
import Login from "./js/Login/Login";
import Signup from "./js/Login/Signup";
import Category from "./js/Category/Category";
import Cart from "./js/Cart/Cart";
import Admin from "./js/Admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./js/Header/Header";
import Footer from "./js/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

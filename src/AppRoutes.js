import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./js/MainContent/MainContent";
import ProductDetail from "./js/Product/ProductDetail";
import Login from "./js/Login/Login";
import Signup from "./js/Login/Signup";
import Category from "./js/Category/Category";
import Cart from "./js/Cart/Cart";
import Admin from "./js/Admin/Admin";
import MyPage from "./js/MyPage/MyPage";
import Checkout from "./js/Checkout/Checkout";
import HandlePayment from "./js/Checkout/HandlePayment";
import Orders from "./js/Orders/Orders";

// 이 프로젝트에서 있는 AppRoute들 path 정리
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/category" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payments" element={<HandlePayment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default AppRoutes;

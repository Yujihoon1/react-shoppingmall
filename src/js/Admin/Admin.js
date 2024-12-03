import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./Dashboard";
import OrderManagement from "./OrderManagement";
import InventoryManagement from "./InventoryManagement";
import ProductAdd from "../Product/ProductAdd";
import ProductUpdate from "../Product/ProductUpdate";
// import ReviewManagement from "./ReviewManagement";
import PromotionManagement from "./PromotionManagement";
// import Statistics from "./Statistics";
import PromotionAdd from "../Promotion/PromotionAdd";
import PromotionEdit from "../Promotion/PromotionEdit";
import UserManagement from "./UserManagement";

//관리자 페이지
function Admin() {
  return (
    <div className="admin-dashboard">
      <nav className="admin-navigation">
        <ul>
          <li>
            <Link to="/admin/dashboard">대시보드</Link>
          </li>
          <li>
            <Link to="/admin/users">유저 관리</Link>
          </li>
          <li>
            <Link to="/admin/orders">주문 관리</Link>
          </li>
          <li>
            <Link to="/admin/inventory">재고 관리</Link>
          </li>
          <li>
            <Link to="/admin/reviews">리뷰 관리</Link>
          </li>
          <li>
            <Link to="/admin/promotions">프로모션 관리</Link>
          </li>
          <li>
            <Link to="/admin/statistics">통계 및 보고서</Link>
          </li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route
            path="products/update/:product_num"
            element={<ProductUpdate />}
          />
          {/* <Route path="/admin/reviews" element={<ReviewManagement />} /> */}
          <Route path="promotions" element={<PromotionManagement />} />
          <Route path="promotions/add" element={<PromotionAdd />} />
          <Route
            path="promotions/edit/:promotionId"
            element={<PromotionEdit />}
          />
          {/* <Route path="/admin/statistics" element={<Statistics />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

function OrderDetail() {
  const { order_id } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/${user.user_num}/${order_id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch order details: ", error);
      });
  }, [user, order_id]);

  if (!order) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="order-detail">
      <h2>주문 ID: {order.order_id}</h2>
      <p>사용자 번호: {order.user_num}</p>
      <p>총 가격: {order.total_price}</p>
      <p>주문 날짜: {order.order_date}</p>

      <h3>주문 상세:</h3>
      {Array.isArray(order.OrderDetails) &&
        order.OrderDetails.map((detail) => (
          <div key={detail.order_detail_id}>
            <p>상세 ID: {detail.order_detail_id}</p>
            <p>주문 ID: {detail.order_id}</p>
            <p>제품 번호: {detail.product_num}</p>
            <p>수량: {detail.quantity}</p>
          </div>
        ))}
    </div>
  );
}

export default OrderDetail;

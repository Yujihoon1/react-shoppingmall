import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

function Order({ user_num }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get(`http://localhost:5000/orders/${user.user_num}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch order data: ", error);
        });
    }
  }, [user]);
  // 주문 내역이 비어있는 경우 메시지 렌더링
  const renderNoOrdersMessage = () => {
    return <div>주문 내역이 없습니다.</div>;
  };

  return (
    <div className="order">
      {
        orders.length > 0 // 주문 내역이 있는 경우
          ? orders.map((order) => (
              <Link to={`/orders/${order.order_id}`} key={order.order_id}>
                <div>주문 ID: {order.order_id}</div>
                <div>사용자 번호: {order.user_num}</div>
                <div>총 가격: {order.total_price_int}원</div>
                <div>주문 날짜: {order.order_date_format}</div>
                <div>주문 상세:</div>
                {Array.isArray(order.OrderDetails) &&
                  order.OrderDetails.map((detail) => (
                    <div key={detail.order_detail_id}>
                      <div>상세 ID: {detail.order_detail_id}</div>
                      <div>주문 ID: {detail.order_id}</div>
                      <div>제품 번호: {detail.product_num}</div>
                      <div>수량: {detail.quantity}</div>
                    </div>
                  ))}
              </Link>
            ))
          : renderNoOrdersMessage() // 주문 내역이 없는 경우
      }
    </div>
  );
}

export default Order;

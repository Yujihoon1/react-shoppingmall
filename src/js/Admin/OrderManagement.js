import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 관리자가 모든 주문을 볼 수 있도록 설정
    axios
      .get(`http://localhost:5000/orders/admin`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders: ", error);
      });
  }, []);

  // 주문 상태를 업데이트하는 함수
  const updateOrderStatus = (orderId, newStatus) => {
    axios
      .put(`http://localhost:5000/orders/${orderId}`, { status: newStatus })
      .then((response) => {
        // 상태 업데이트 후 주문 목록을 갱신
        setOrders(
          orders.map((order) => {
            if (order.order_id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          })
        );
      })
      .catch((error) => {
        console.error("Failed to update order status: ", error);
      });
  };

  // 주문 삭제 함수
  const deleteOrder = (orderId) => {
    axios
      .delete(`http://localhost:5000/orders/${orderId}`)
      .then((response) => {
        // 삭제 후 주문 목록을 갱신
        setOrders(orders.filter((order) => order.order_id !== orderId));
      })
      .catch((error) => {
        console.error("Failed to delete order: ", error);
      });
  };

  return (
    <div>
      <h1>주문 관리</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.order_id} className="order-item">
            <Link to={`/admin/orders/${order.order_id}`}>
              <h2>주문 ID: {order.order_id}</h2>
              <p>사용자 번호: {order.user_num}</p>
              <p>총 가격: {order.total_price}</p>
              <p>주문 날짜: {order.order_date}</p>
              <p>주문 상태: {order.status}</p>
            </Link>
            {/* 주문 상태 변경 기능 */}
            <button
              onClick={() => updateOrderStatus(order.order_id, "새 상태")}
            >
              상태 업데이트
            </button>
            <button onClick={() => deleteOrder(order.order_id)}>
              주문 삭제
            </button>
          </div>
        ))
      ) : (
        <p>주문이 없습니다.</p>
      )}
    </div>
  );
}

export default OrderManagement;

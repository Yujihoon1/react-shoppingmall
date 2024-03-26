import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

async function saveMyInfo(myInfoData) {
  const response = await fetch("http://localhost:5000/myinfos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myInfoData),
  });
  if (!response.ok) throw new Error("개인 정보 저장에 실패했습니다.");
  return response.json(); // 저장된 MyInfo의 ID를 반환
}

async function savePayment(paymentData) {
  const response = await fetch("http://localhost:5000/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) throw new Error("결제 정보 저장에 실패했습니다.");
  return response.json(); // 성공 시 응답 데이터를 반환
}

async function saveOrder(orderData) {
  const response = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("주문 정보 저장에 실패했습니다.");
  return response.json(); // 저장된 Order의 ID를 반환
}

function HandlePayment({ isAgreed, myInfo, paymentInfo, product, quantity }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); //기본 이벤트 방지

    if (!isAgreed) {
      alert("약관에 동의해주세요.");
      return;
    }

    try {
      // 개인 정보 저장
      const myInfoResult = await saveMyInfo({
        ...myInfo,
        user_num: user.user_num,
      });

      // 결제 정보 저장
      const paymentResult = await savePayment({
        ...paymentInfo,
        MyInfo_id: myInfoResult.MyInfo_id,
        user_num: user.user_num,
      });

      // 주문 정보 저장
      const orderData = {
        user_name: user.user_name,
        user_num: user.user_num,
        total_price: product.product_price * quantity,
        orderDetails: [
          {
            product_num: product.product_num,
            quantity: quantity,
          },
        ],
      };
      const orderResult = await saveOrder(orderData);
      if (!orderResult) throw new Error("주문 정보 저장에 실패했습니다.");

      // 모든 정보가 성공적으로 저장되면 주문 목록 페이지로 리디렉션
      alert("주문에 성공하였습니다.");
      navigate("/orders");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">결제하기</button>
    </form>
  );
}

export default HandlePayment;

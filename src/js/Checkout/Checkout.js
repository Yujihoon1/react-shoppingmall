import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyInfo from "../MyPage/MyInfo";
import Payment from "../MyPage/Payment";
import Term from "../Checkout/Term";
import HandlePayment from "../Checkout/HandlePayment";

function Checkout() {
  const location = useLocation();
  const { product, quantity } = location.state;
  const totalPrice = product.product_price * quantity; // 총 가격 계산

  const [isAgreed, setIsAgreed] = useState(false);

  const [myInfo, setMyInfo] = useState({
    name: " ",
    phone: " ",
    address: " ",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  return (
    <>
      <article id={`product-card-${product.product_num}`}>
        <div className="product-img">
          <img alt={`${product.product_name} Image`} />
        </div>
        <h3 className="product-name">상품 이름: {product.product_name}</h3>
        <p className="product-price">가격: {product.product_price}원</p>
        <p className="product-content">상품 : {product.product_content}</p>
        <p className="quantity">상품 갯수:{quantity} 개</p>
        <p className="total-price">총 가격: {totalPrice} 원</p>
      </article>
      <MyInfo onMyInfoChange={setMyInfo} />
      <Payment onPaymentInfoChange={setPaymentInfo} />
      <div>
        <Term />
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
        />
        <label>이용 약관에 동의합니다.</label>
      </div>
      <HandlePayment
        isAgreed={isAgreed}
        myInfo={myInfo}
        paymentInfo={paymentInfo}
        product={product}
        quantity={quantity}
      />
    </>
  );
}

export default Checkout;

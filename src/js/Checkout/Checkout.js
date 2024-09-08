import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyInfo from "../MyPage/MyInfo";
import Payment from "../MyPage/Payment";
import Term from "../Checkout/Term";
import HandlePayment from "../Checkout/HandlePayment";

function Checkout() {
  const location = useLocation();
  const { items } = location.state;

  // 총 가격 계산
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.product_price * item.quantity,
    0
  );

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
      {items.map((item, index) => {
        // 각 아이템별 총 가격 계산
        const itemTotalPrice = item.product.product_price * item.quantity;

        return (
          <article id={`product-card-${item.product.product_num}`} key={index}>
            <div className="product-img">
              <img
                src={`http://localhost:5000/${item.product.product_image}`}
                alt={`${item.product.product_name} Image`}
              />
            </div>
            <h3 className="product-name">
              상품 이름: {item.product.product_name}
            </h3>
            <p className="product-price">
              가격: {item.product.product_price}원
            </p>
            <p className="product-content">
              상품 설명: {item.product.product_content}
            </p>
            <p className="quantity">상품 갯수: {item.quantity} 개</p>
            <p className="item-total-price">
              해당 상품 총 가격: {itemTotalPrice} 원
            </p>
          </article>
        );
      })}
      <p className="total-price">총 결제 금액: {totalPrice} 원</p>
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
        items={items}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default Checkout;

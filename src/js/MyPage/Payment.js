import React, { useState } from "react";

function PaymentInfo({ onPaymentInfoChange }) {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newPaymentInfo = { ...paymentInfo, [name]: value };
    setPaymentInfo(newPaymentInfo);
    onPaymentInfoChange(newPaymentInfo);
  };

  return (
    <div>
      <input
        type="text"
        name="cardNumber"
        value={paymentInfo.cardNumber}
        onChange={handleChange}
        placeholder="카드 번호"
      />
      <input
        type="text"
        name="expiryDate"
        value={paymentInfo.expiryDate}
        onChange={handleChange}
        placeholder="만료일"
      />
      <input
        type="text"
        name="cvc"
        value={paymentInfo.cvc}
        onChange={handleChange}
        placeholder="CVC"
      />
    </div>
  );
}

export default PaymentInfo;

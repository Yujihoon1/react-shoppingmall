import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      console.log("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/cart/${user.user_num}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("장바구니 정보를 가져오는 데 실패했습니다.");
      }

      const data = await response.json();
      console.log("장바구니 데이터:", data); // 데이터를 콘솔에 출력하여 확인
      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
      console.log(itemId);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      console.log("로그인이 필요합니다.");
      return;
    }

    const selectedItemsDetails = cartItems
      .filter((item) => selectedItems.includes(item.cart_id))
      .map((item) => ({
        product: {
          ...item.Product,
        },
        quantity: item.quantity,
      }));

    navigate("/checkout", {
      state: {
        items: selectedItemsDetails,
        itemIds: selectedItems,
      },
    });
  };

  return (
    <div>
      <h2>장바구니</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.cart_id}>
            <input
              type="checkbox"
              onChange={(e) =>
                handleCheckboxChange(item.cart_id, e.target.checked)
              }
            />
            <div>장바구니 번호: {item.cart_id}</div>
            <div>제품 번호: {item.Product.product_num}</div>
            <div>제품 이름: {item.Product.product_name}</div>
            <div>
              제품 이미지:{" "}
              <img
                src={`http://localhost:5000/${item.Product.product_image}`}
                alt={item.Product.product_name}
              />
            </div>
            <div>수량: {item.quantity}</div>
            <div>총가격: {item.quantity * item.Product.product_price} 원</div>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>결제하기</button>
    </div>
  );
}

export default Cart;

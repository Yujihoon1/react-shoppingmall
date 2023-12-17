import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//Product Form 은 구매/장바구니 담기 등 상품 관련해서 선택할 수 있는 내역들
function ProductForm({ product, quantity, onQuantityChange }) {
  const navigate = useNavigate();

  // 갯수 조절 로직
  const handleQuantityChange = (e) => {
    onQuantityChange(e.target.value);
  };

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handlePurchase = (product) => {
    // 구매 로직
    navigate("/checkout", {
      state: { product, quantity },
    });
    console.log(`구매: ${product.name}`);
  };

  const handleAddToCart = (product) => {
    // 장바구니 담기 로직
    console.log(`장바구니 담기: ${product.name}`);
  };

  if (!product) {
    console.log("상품이 없음");
    return null; // or <div>상품 정보가 없습니다.</div>
  }

  return (
    <form>
      {/* Product form 컨트롤*/}
      <button type="button" onClick={decreaseQuantity}>
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        style={{ width: "50px", textAlign: "center" }}
      />
      <button type="button" onClick={increaseQuantity}>
        +
      </button>
      <button type="button" onClick={() => handlePurchase(product)}>
        구매
      </button>
      <button type="button" onClick={() => handleAddToCart(product)}>
        장바구니 담기
      </button>
    </form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    product_num: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default ProductForm;

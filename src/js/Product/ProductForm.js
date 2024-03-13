import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import cartImg from "./cart.png";

function ProductForm({ product, quantity, onQuantityChange }) {
  const navigate = useNavigate();

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
    navigate("/checkout", {
      state: { product, quantity },
    });
    console.log(`구매: ${product.product_name}`);
  };

  const handleAddToCart = (product) => {
    console.log(`장바구니 담기: ${product.name}`);
  };

  if (!product) {
    console.log("상품이 없음");
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <>
      <div className="quantity-control">
        <button type="button" onClick={decreaseQuantity}>
          -
        </button>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <button type="button" onClick={increaseQuantity}>
          +
        </button>
      </div>
      <div className="product-buttons">
        <button
          type="button"
          className="buy"
          onClick={() => handlePurchase(product)}
        >
          바로 구매
        </button>
        <button
          type="button"
          className="cart"
          onClick={() => handleAddToCart(product)}
        >
          <img src={cartImg} alt="Cart" />
        </button>
      </div>
    </>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    product_num: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
    product_content: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default ProductForm;

import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//Product Form 은 구매/장바구니 담기 등 상품 관련해서 선택할 수 있는 내역들
function ProductForm({ product, onPurchase, onAddToCart }) {
  const navigate = useNavigate();

  const handlePurchase = (product) => {
    // 구매 로직
    onPurchase(product);
    navigate(`/product/${product.id}`);
    console.log(`구매: ${product.name}`);
  };

  const handleAddToCart = (product) => {
    // 장바구니 담기 로직
    onAddToCart(product);
    console.log(`장바구니 담기: ${product.name}`);
  };

  return (
    <form>
      {/* Product form 컨트롤*/}
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onPurchase: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductForm;

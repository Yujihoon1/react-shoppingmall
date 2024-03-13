import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//ProductCard는 상품의 이미지, 이름, 가격
function ProductCard({ product, onProductDetail }) {
  const navigate = useNavigate();

  const handleProductDetail = (product) => {
    // onProductDetail(product);
    navigate(`/product/${product.product_num}`);
    console.log(`구매: ${product.product_name}`);
  };

  return (
    <div id={`product-card-${product.product_num}`} className="product-card">
      <div className="product-img" onClick={() => handleProductDetail(product)}>
        <img
          src={`http://localhost:5000/${product.product_image}`}
          alt={`${product.product_name} Image`}
        />
      </div>
      <h3 className="product-name" onClick={() => handleProductDetail(product)}>
        {product.product_name}
      </h3>
      <p className="product-price" onClick={() => handleProductDetail(product)}>
        가격: {product.product_price}원
      </p>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    product_num: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
    product_content: PropTypes.string.isRequired,
  }).isRequired,
  onProductDetail: PropTypes.func.isRequired,
};

export default ProductCard;

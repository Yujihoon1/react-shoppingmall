import React from "react";
import { useParams } from "react-router-dom";

//상품 상세 페이지
function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = getProductById(productId);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <article id={"product-card-${product.id}"}>
      <div className="product-img">
        <img alt={"${product.name} Image"} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">가격: {product.price}원</p>
      <p className="product-content">상품 설명: {product.content}</p>
    </article>
  );
}

function getProductById(id) {
  // id에 해당하는 상품을 찾아 반환하는 로직
  const products = [
    { id: 1, name: "상품1", price: 1000, content: "상품1입니다" },
    { id: 2, name: "상품2", price: 2000, content: "상품2입니다" },
    { id: 3, name: "상품3", price: 3000, content: "상품3입니다" },
  ];

  return products.find((product) => product.id === id);
}

export default ProductDetail;

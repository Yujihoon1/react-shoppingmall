import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import axios from "axios";

//상품 상세 페이지
function ProductDetail() {
  const { id } = useParams();
  const productNum = parseInt(id);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // 구매 수량 관리
  const totalPrice = product?.product_price * quantity; // 총 가격 계산

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productNum}`
        );
        setProduct({
          ...response.data,
          product_price: parseFloat(response.data.product_price),
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productNum]);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {product ? (
        <article id={`product-card-${product.product_num}`}>
          <div className="product-img">
            <img alt={`${product.product_name} Image`} />
          </div>
          <h3 className="product-name">{product.product_name}</h3>
          <p className="product-price">가격: {product.product_price}원</p>
          <p className="product-content">
            상품 설명: {product.product_content}
          </p>
          <p className="total-price">총가격: {totalPrice} 원</p>
        </article>
      ) : (
        <div>상품 정보를 불러오는 중...</div>
      )}
      <ProductForm
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </>
  );
}

export default ProductDetail;

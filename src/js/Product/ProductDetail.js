import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import axios from "axios";
import Product from "./Product.css";

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
        <article
          id={`product-card-${product.product_num}`}
          className="product-detail"
        >
          <div className="product-img">
            <img
              src={`http://localhost:5000/${product.product_image}`}
              alt={`${product.product_name} Image`}
            />
          </div>
          <div className="product-detail-content">
            <div className="product-name">제품명: {product.product_name}</div>
            <div className="product-price">가격: {product.product_price}원</div>
            <div className="product-content">
              상품 설명: {product.product_content}
            </div>
            <div className="total-price">총 가격: {totalPrice} 원</div>
            <ProductForm
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </article>
      ) : (
        <div>상품 정보를 불러오는 중...</div>
      )}
    </>
  );
}

export default ProductDetail;

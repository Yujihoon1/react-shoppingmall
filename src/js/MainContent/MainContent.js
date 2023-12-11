import React from "react";
import ProductCard from "../Product/ProductCard";
import ProductForm from "../Product/ProductForm";

function MainContent() {
  // proudct 데이터 배열
  const products = [
    { id: 1, name: "상품1", price: 1000, content: "상품1입니다" },
    { id: 2, name: "상품2", price: 2000, content: "상품2입니다" },
    { id: 3, name: "상품3", price: 3000, content: "상품3입니다" },
  ];

  const handleProductDetail = (product) => {
    // 상품상세 정보보기
    console.log(`상세 정보 보기: ${product.name}`);
  };

  const handlePurchase = (product) => {
    // 구매 로직
    console.log(`구매: ${product.name}`);
  };

  const handleAddToCart = (product) => {
    // 장바구니 담기 로직
    console.log(`장바구니 담기: ${product.name}`);
  };

  return (
    <>
      <div className="banner">배너</div>
      <section id="product-list">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              onProductDetail={handleProductDetail}
            />
            <ProductForm
              product={product}
              onPurchase={handlePurchase}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default MainContent;

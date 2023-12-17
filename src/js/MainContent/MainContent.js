import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import ProductForm from "../Product/ProductForm";
import axios from "axios";

const MainContent = () => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1); // 구매 수량 관리

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        const productsWithNumberPrice = response.data.map((product) => ({
          ...product,
          product_price: parseFloat(product.product_price),
        }));
        setProduct(productsWithNumberPrice);
        // console.log(productsWithNumberPrice);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleProductDetail = (product) => {
    // 상품상세 정보보기
    console.log(`상세 정보 보기: ${product.product_name}`);
  };

  const handlePurchase = (product) => {
    // 구매 로직
    console.log(`구매: ${product.product_name}`);
  };

  const handleAddToCart = (product) => {
    // 장바구니 담기 로직
    console.log(`장바구니 담기: ${product.product_name}`);
  };

  return (
    <>
      <div className="banner">배너</div>
      <section id="product-list">
        {product.map((productItem) => (
          <React.Fragment key={productItem.num}>
            <ProductCard
              product={productItem}
              onProductDetail={handleProductDetail}
            />
            <ProductForm
              product={productItem}
              onPurchase={handlePurchase}
              onAddToCart={handleAddToCart}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default MainContent;

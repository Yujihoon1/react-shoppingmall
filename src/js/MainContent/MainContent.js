import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import ProductForm from "../Product/ProductForm";
import axios from "axios";
import "./MainContent.css";
import { Link } from "react-router-dom";

//fetchPromotionBanner
const fetchPromotionBanner = async () => {
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 변환
  try {
    const response = await axios.get(
      `http://localhost:5000/promotions/active?date=${today}`
    );
    return response.data; // 활성화된 프로모션 데이터 반환
  } catch (error) {
    console.error("Error fetching active promotions:", error);
    return []; // 오류가 발생한 경우 빈 배열 반환
  }
};

const MainContent = () => {
  const [product, setProduct] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
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

    const getActivePromotions = async () => {
      const promotions = await fetchPromotionBanner();
      setActivePromotions(promotions);
    };

    getActivePromotions();
    fetchProduct();
  }, []);

  const prevBanner = () => {
    setCurrentBanner(
      currentBanner === 0 ? activePromotions.length - 1 : currentBanner - 1
    );
  };

  const nextBanner = () => {
    setCurrentBanner(
      currentBanner === activePromotions.length - 1 ? 0 : currentBanner + 1
    );
  };

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
      <div className="banner">
        {activePromotions.length > 0 && (
          <>
            <div className="prev" onClick={prevBanner}>
              Prev
            </div>
            <Link
              to={`/promotion/${activePromotions[currentBanner].promotion_id}`}
            >
              <img
                src={`http://localhost:5000/${activePromotions[currentBanner].promotion_banner_image_path}`}
                alt={`Active Promotion ${currentBanner}`}
              />
            </Link>
            <div className="next" onClick={nextBanner}>
              Next
            </div>
          </>
        )}
      </div>
      <div className="product-list">
        {product.map((productItem) => (
          <div key={productItem.num} className="product-card">
            <React.Fragment key={productItem.num}>
              <ProductCard
                product={productItem}
                onProductDetail={handleProductDetail}
              />
              <div className="product-form">
                <ProductForm
                  product={productItem}
                  onPurchase={handlePurchase}
                  onAddToCart={handleAddToCart}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </div>
            </React.Fragment>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;

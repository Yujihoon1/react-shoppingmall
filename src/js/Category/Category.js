import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Product/ProductCard";
import ProductForm from "../Product/ProductForm";

function Category() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 모든 상품을 가져오기
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      setProducts(response.data);
    });

    // 카테고리 정보 가져오기
    axios.get("http://localhost:5000/category").then((response) => {
      // '전체' 카테고리를 추가
      setCategories([
        { category_id: "0", category_name: "전체" },
        ...response.data,
      ]);
    });
  }, []);

  const handleClick = (categoryId) => {
    // 선택된 카테고리의 이름을 찾기
    const categoryName = categories.find(
      (category) => category.category_id === categoryId
    )?.category_name;

    // 상태를 업데이트 -> 선택된 카테고리의 이름을 저장
    setSelectedCategory(categoryName || "전체");

    if (categoryId === "0") {
      // '전체' 카테고리 선택 시 모든 상품 불러옴
      axios.get("http://localhost:5000/products").then((response) => {
        setProducts(response.data);
      });
    } else {
      // 카테고리를 선택하면 해당 카테고리의 상품목록을 가져 옴
      axios
        .get(`http://localhost:5000/category/${categoryId}`)
        .then((response) => {
          setProducts(response.data);
        });
    }
  };

  const handleProductDetail = (product) => {};

  const handlePurchase = (product) => {};

  const handleAddToCart = (product) => {};

  return (
    <div>
      <div className="category">
        {categories.map((category) => (
          <div
            key={category.category_id}
            onClick={() => handleClick(category.category_id)}
          >
            {category.category_name}
          </div>
        ))}
      </div>

      {/* 현재 선택된 카테고리의 이름을 동적으로 표시 */}
      <h1>{selectedCategory}</h1>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.product_num} className="product-card">
            <React.Fragment key={product.product_num}>
              <ProductCard
                product={product}
                onProductDetail={handleProductDetail}
              />
              <div className="product-form">
                <ProductForm
                  product={product}
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
    </div>
  );
}

export default Category;

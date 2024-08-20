// InventoryManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Inventory Management</h1>
      <button onClick={() => navigate("/admin/products/add")}>상품 추가</button>
      <div>
        {products.map((product) => (
          <div key={product.product_num}>
            <span>{product.product_num}</span>
            <span>{product.product_name}</span>
            {product.product_image && ( // 'products'가 아닌 'product'를 사용
              <img
                src={`http://localhost:5000/${product.product_image}`} // 각 제품의 이미지 경로
                alt={product.product_name} // alt 속성에는 제품 이름을 사용
                style={{ width: "50rem", height: "20rem" }} // px 단위로 크기를 지정
              />
            )}
            <span>{product.product_price}</span>
            <button
              onClick={() =>
                navigate(`/admin/products/update/${product.product_num}`)
              }
            >
              수정
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;

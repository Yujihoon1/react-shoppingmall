import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_price: "",
    product_content: "",
    product_image: null,
    category_id: "",
    stock: "", // 재고 상태 추가
  });

  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // 파일 입력 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, product_image: file });
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 설정
    }
  };

  // 제품을 추가하는 함수
  const addProduct = async () => {
    const formData = new FormData();
    // 폼 데이터에 입력값들 추가
    Object.entries(newProduct).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일을 포함한 데이터 전송 시 설정
        },
      });
      navigate("/admin/inventory"); // 제품 목록 페이지로 이동
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // 컴포넌트 마운트 시 카테고리 목록 가져오기
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/products/category"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>상품 추가</h1>
      <p>제품명</p>
      <input
        type="text"
        name="product_name"
        value={newProduct.product_name}
        onChange={handleInputChange}
        placeholder="제품명"
      />
      <p>카테고리</p>
      <select
        name="category_id"
        value={newProduct.category_id}
        onChange={handleInputChange}
      >
        {categories.map((category) => (
          <option value={category.category_id} key={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <p>가격</p>
      <input
        type="text"
        name="product_price"
        value={newProduct.product_price}
        onChange={handleInputChange}
        placeholder="가격"
      />
      <p>미리보기</p>
      <input type="file" name="product_image" onChange={handleFileChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      <p>재고</p>
      <input
        type="number"
        name="stock"
        value={newProduct.stock}
        onChange={handleInputChange}
        placeholder="재고"
      />
      <button onClick={addProduct}>제품 추가</button>
    </div>
  );
};

export default ProductAdd;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpdate = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    product_content: "",
    product_image: null,
    category_id: null,
    stock: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { product_num } = useParams();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${product_num}`
        );
        setProductData({
          product_name: response.data.product_name,
          product_price: response.data.product_price,
          product_content: response.data.product_content,
          product_image: null, // 이미지는 새로 업로드하기 위해 null로 초기화
          category_id: response.data.category_id,
          stock: response.data.stock,
        });
        setImagePreview(`http://localhost:5000/${response.data.product_image}`);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [product_num]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, product_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "category_id" && value === "") {
        // category_id가 빈 문자열인 경우, 추가하지 않음
        return;
      }
      formData.append(key, value);
    });

    // 파일이 새로 업로드된 경우에만 추가
    if (productData.product_image instanceof File) {
      formData.append("product_image", productData.product_image);
    }

    try {
      await axios.put(
        `http://localhost:5000/products/${product_num}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/inventory-management");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>상품 수정</h1>
      <span>제품명</span>
      <br />
      <input
        type="text"
        name="product_name"
        value={productData.product_name}
        onChange={handleInputChange}
        placeholder="제품명"
      />
      <br />
      <p>카테고리</p>
      <select
        name="category_id"
        value={productData.category_id}
        onChange={handleInputChange}
      >
        {categories.map((category) => (
          <option value={category.category_id} key={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <p>가격</p>
      <br />
      <input
        type="text"
        name="product_price"
        value={productData.product_price}
        onChange={handleInputChange}
        placeholder="가격"
      />
      <br />
      <span>제품 설명</span>
      <br />
      <textarea
        name="product_content"
        value={productData.product_content}
        onChange={handleInputChange}
        placeholder="제품 설명"
      />
      <br />
      <span>미리보기</span>
      <br />
      <input type="file" name="product_image" onChange={handleImageChange} />
      <br />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Product Preview"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}
      <br />
      <span>재고</span>
      <br />
      <input
        type="number"
        name="stock"
        value={productData.stock}
        onChange={handleInputChange}
        placeholder="재고"
      />
      <br />
      <button onClick={updateProduct}>수정 확인</button>
    </div>
  );
};

export default ProductUpdate;

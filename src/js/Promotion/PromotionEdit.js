import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PromotionEdit() {
  const [promotionData, setPromotionData] = useState({
    title: "",
    content: "",
    isVisible: false,
    startDate: "",
    endDate: "",
    bannerImage: null,
    promotionImages: [],
  });
  const [bannerPreview, setBannerPreview] = useState(null);
  const [contentPreviews, setContentPreviews] = useState([]);
  const { promotionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/promotions/${promotionId}`)
      .then((response) => {
        const {
          promotion_title,
          promotion_content,
          promotion_is_visible,
          promotion_start_date,
          promotion_end_date,
          promotion_banner_image_path,
          promotionImages,
        } = response.data;

        setPromotionData({
          title: promotion_title,
          content: promotion_content,
          isVisible: promotion_is_visible,
          startDate: promotion_start_date,
          endDate: promotion_end_date,
          bannerImage: promotion_banner_image_path,
          promotionImages,
        });

        setBannerPreview(
          `http://localhost:5000/${promotion_banner_image_path}`
        );

        const imagePaths = promotionImages.map(
          (image) => `http://localhost:5000/${image.promotion_image_path}`
        );
        setContentPreviews(imagePaths);
      })
      .catch((error) => {
        console.error("Error fetching the promotion details: ", error);
      });
  }, [promotionId]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPromotionData({
      ...promotionData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPromotionData({ ...promotionData, bannerImage: file });
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleContentImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setPromotionData({
      ...promotionData,
      promotionImages: files,
    });
    const newContentPreviews = files.map((file) => URL.createObjectURL(file));
    setContentPreviews(newContentPreviews);
  };

  const handleSavePromotion = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", promotionData.title);
    formData.append("content", promotionData.content);
    formData.append("isVisible", promotionData.isVisible);
    formData.append("startDate", promotionData.startDate);
    formData.append("endDate", promotionData.endDate);

    if (promotionData.bannerImage instanceof File) {
      formData.append("bannerImage", promotionData.bannerImage);
    }

    promotionData.promotionImages.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`contentImages`, image);
      }
    });

    axios
      .put(`http://localhost:5000/promotions/${promotionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("프로모션이 업데이트되었습니다.");
        navigate("/admin/promotions");
      })
      .catch((error) => {
        console.error("Failed to update the promotion: ", error);
      });
  };

  const handleCancel = () => {
    navigate("/admin/promotions");
  };

  return (
    <div>
      <h1>프로모션 수정</h1>
      <input
        type="text"
        name="title"
        value={promotionData.title}
        onChange={handleInputChange}
        placeholder="프로모션의 제목"
      />
      <input
        type="file"
        name="bannerImage"
        onChange={handleBannerImageChange}
      />
      {bannerPreview && (
        <img
          src={bannerPreview}
          alt="Banner Preview"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}
      <input
        type="file"
        name="contentImages"
        onChange={handleContentImagesChange}
        multiple
      />
      <div>
        {contentPreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Content Preview ${index}`}
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        ))}
      </div>
      <textarea
        name="content"
        value={promotionData.content}
        onChange={handleInputChange}
        placeholder="프로모션 내용"
      />
      <label>
        이벤트 공개 여부:
        <input
          type="checkbox"
          name="isVisible"
          checked={promotionData.isVisible}
          onChange={handleInputChange}
        />
      </label>
      <p>이벤트 시작일:</p>
      <input
        type="date"
        name="startDate"
        value={promotionData.startDate}
        onChange={handleInputChange}
      />
      <p>이벤트 종료일:</p>
      <input
        type="date"
        name="endDate"
        value={promotionData.endDate}
        onChange={handleInputChange}
      />
      <button onClick={handleSavePromotion}>저장</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
}

export default PromotionEdit;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PromotionAdd() {
  const [promotionData, setPromotionData] = useState({
    title: "",
    bannerImage: null,
    content: "",
    isVisible: false,
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  //미리보기 이미지 상태
  const [bannerPreview, setBannerPreview] = useState(null);

  // 본문 이미지 파일 목록을 관리하는 상태
  const [images, setImages] = useState([]);
  // 본문 이미지 미리보기 목록을 관리하는 상태
  const [imagePreviews, setImagePreviews] = useState([]);

  // 폼 데이터 핸들링
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionData({ ...promotionData, [name]: value });
  };

  // 배너 이미지 파일 핸들링
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPromotionData({ ...promotionData, bannerImage: file });
      setBannerPreview(URL.createObjectURL(file)); // 미리보기 URL 생성하여 상태에 저장
    }
  };

  // 본문 이미지 파일들을 핸들링하는 함수
  const handleContentImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]); // 이전 이미지들과 새 이미지들을 합쳐서 상태 업데이트
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]); // 이전 미리보기들과 새 미리보기들을 합쳐서 상태 업데이트
  };

  // 프로모션 데이터 저장 핸들러
  const handleSavePromotion = () => {
    const formData = new FormData();
    formData.append("title", promotionData.title);
    formData.append("content", promotionData.content);
    formData.append("isVisible", promotionData.isVisible);
    formData.append("startDate", promotionData.startDate);
    formData.append("endDate", promotionData.endDate);

    // 이미지 파일이 있으면 추가
    if (promotionData.bannerImage) {
      formData.append("bannerImage", promotionData.bannerImage);
    }

    // 이미지 파일들을 formData에 추가
    images.forEach((image, index) => {
      formData.append(`contentImages`, image);
    });

    axios
      .post("http://localhost:5000/promotions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("프로모션이 저장되었습니다.");
        navigate("/admin/promotions");
      })
      .catch((error) => {
        console.error("Failed to save the promotion data: ", error);
      });
  };

  // 폼 취소 로직
  const handleCancel = () => {
    // 폼 내용을 초기화
    setPromotionData({
      title: "",
      bannerImage: null,
      content: "",
      isVisible: false,
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div>
      <h1>프로모션 추가</h1>
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
        <div>
          <img
            src={bannerPreview}
            alt="Banner Preview"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}

      <input
        type="file"
        name="contentImages"
        onChange={handleContentImagesChange}
        multiple
      />
      <div>
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
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
      <input
        type="checkbox"
        name="isVisible"
        checked={promotionData.isVisible}
        onChange={(e) =>
          setPromotionData({ ...promotionData, isVisible: e.target.checked })
        }
      />
      <p>이벤트 시작일</p>
      <input
        type="date"
        name="startDate"
        value={promotionData.startDate}
        onChange={handleInputChange}
      />
      <p>이벤트 끝나는 날짜</p>
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

export default PromotionAdd;

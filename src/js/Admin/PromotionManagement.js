import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PromotionManagement() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/promotions")
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the promotions: ", error);
      });
  }, []);

  const handleDelete = (promotionId) => {
    axios
      .delete(`http://localhost:5000/promotions/${promotionId}`)
      .then(() => {
        setPromotions(
          promotions.filter(
            (promotion) => promotion.promotion_id !== promotionId
          )
        );
      })
      .catch((error) => {
        console.error("Failed to delete the promotion: ", error);
      });
  };

  return (
    <div>
      <h1>프로모션 목록</h1>
      <Link to="add">프로모션 추가</Link>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.promotion_id}>
            {promotion.promotion_title}
            {promotion.promotion_banner_image_path && (
              <img
                src={`http://localhost:5000/${promotion.promotion_banner_image_path}`}
                alt="Promotion Banner"
                style={{ width: "200px", height: "100px" }}
              />
            )}
            {promotion.promotion_start_date} {promotion.promotion_end_date}
            <button onClick={() => handleDelete(promotion.promotion_id)}>
              삭제
            </button>
            <Link to={`edit/${promotion.promotion_id}`}>수정</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PromotionManagement;

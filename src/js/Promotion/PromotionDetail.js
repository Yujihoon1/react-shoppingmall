import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PromotionDetail() {
  const { promotion_id } = useParams();
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/promotions/${promotion_id}`
        );
        setPromotion(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPromotion();
  }, [promotion_id]);

  if (!promotion) return null;

  return (
    <div className="banner_detail">
      <h2>{promotion.promotion_title}</h2>
      <img
        src={`http://localhost:5000/${promotion.promotion_banner_image_path}`}
        alt="banner"
      />
      {promotion.promotionImages &&
        promotion.promotionImages.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${image.promotion_image_path}`}
            alt={`content ${index}`}
          />
        ))}
      <p>{promotion.promotion_content}</p>
    </div>
  );
}

export default PromotionDetail;

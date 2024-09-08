import Reac, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import cartImg from "./cart.png";
import AuthContext from "../../contexts/AuthContext";

function ProductForm({ product, quantity, onQuantityChange }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    onQuantityChange(e.target.value);
  };

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handlePurchase = (product) => {
    const items = [
      {
        product: product,
        quantity: quantity,
      },
    ];

    navigate("/checkout", {
      state: { items }, // items 배열을 state로 전달
    });
    console.log(`구매: ${product.product_name}`);
  };

  const handleAddToCart = () => {
    const isConfirmed = window.confirm("장바구니에 담으시겠습니까?");
    if (isConfirmed) {
      addToCartLogic(product, quantity);
    }
  };

  const addToCartLogic = async (product, quantity) => {
    // 사용자가 로그인하지 않았을 경우
    if (!user || user.user_num === null) {
      alert("장바구니에 상품을 추가하려면 로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }

    try {
      console.log(user);
      console.log(product.product_num);
      console.log(user.user_num);
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_num: product.product_num,
          quantity,
          user_num: user.user_num,
        }),
      });

      if (response.ok) {
        const moveToCart = window.confirm(
          "장바구니에 해당 상품이 담겼습니다. 장바구니 페이지로 이동하시겠습니까?"
        );
        if (moveToCart) {
          navigate("/cart");
        }
      } else {
        throw new Error("장바구니 추가 실패");
      }
    } catch (error) {
      console.error("장바구니 추가에 실패했습니다.", error);
    }
  };

  if (!product) {
    console.log("상품이 없음");
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <>
      <div className="quantity-control">
        <button type="button" onClick={decreaseQuantity}>
          -
        </button>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <button type="button" onClick={increaseQuantity}>
          +
        </button>
      </div>
      <div className="product-buttons">
        <button
          type="button"
          className="buy"
          onClick={() => handlePurchase(product)}
        >
          바로 구매
        </button>
        <button type="button" className="cart" onClick={handleAddToCart}>
          <img src={cartImg} alt="Cart" />
        </button>
      </div>
    </>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    product_num: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
    product_content: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default ProductForm;

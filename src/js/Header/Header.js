import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./Header.css";
import logo from "./logo.png";

function Header() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  console.log("Header user:", user);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    console.log("Header user:", user); // user 값 확인
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 설정
    setUser(null); // user 정보를 null로 설정
    localStorage.removeItem("user"); // localStorage에서 user 정보 제거
    localStorage.removeItem("token"); // localStorage에서 token 제거
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/category") // 카테고리 API 호출
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  // 토큰 사용
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       axios
  //         .get("http://localhost:5000/mypage", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         })
  //         .then((response) => {
  //           console.log(response.data); // 응답 데이터를 콘솔에 출력
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error); // 에러 발생 시 에러 메시지를 콘솔에 출력
  //         });
  //     }
  //   }
  // }, [isLoggedIn, user]);

  return (
    <header>
      <div className="home">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav>
        <div className="search">
          <input type="text" placeholder="검색" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            카테고리
            {showCategories && (
              <ul className="dropdown">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/category/${category.id}`}>
                      {category.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/mypage">마이페이지</Link>
            ) : (
              <Link to="/login">로그인/회원가입</Link>
            )}
          </li>
          {isLoggedIn && ( // 로그인 상태일 때만 로그아웃 링크 표시
            <li>
              <Link to="/" onClick={handleLogout}>
                로그아웃
              </Link>
            </li>
          )}
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
          {isLoggedIn && user && user.user_grade === "admin" && (
            <li>
              <Link to="/admin">관리자 페이지</Link>
            </li>
          )}
          <li>
            <Link to="/orders">주문 내역</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

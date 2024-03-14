import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./Header.css";
import logo from "./logo.png";

function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);

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
          <li>
            <Link to="/category">카테고리</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/mypage">마이페이지</Link>
            ) : (
              <Link to="/login">로그인/회원가입</Link>
            )}
          </li>
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
          <li>
            <Link to="/admin">관리자 페이지</Link>
          </li>
          <li>
            <Link to="/orders">주문 내역</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

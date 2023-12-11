import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          LOGO
        </Link>
        <input type="text" placeholder="검색" />
        <ul className="nav-links">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/category">카테고리</Link>
          </li>
          <li>
            <Link to="/login">로그인/회원가입</Link>
          </li>
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
          <li>
            <Link to="/admin">관리자 페이지</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

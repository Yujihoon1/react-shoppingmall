import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import LoginCss from "./Login.css";

//로그인 페이지
function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn, setUser, setToken } =
    useContext(AuthContext); // 로그인 상태 변경 함수

  const contextValue = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, password }),
    });

    const result = await response.json();
    if (response.ok) {
      //로그인 성공 시
      console.log("로그인 성공");
      console.log(result);
      setIsLoggedIn(true);
      setUser(result.user);
      console.log(result.user);
      setToken(result.token);
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      //로그인 실패 시
      console.log("로그인 실패");
    }
  };

  return (
    <div className="login">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="로그인" />
      </form>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </div>
  );
}

export default Login;

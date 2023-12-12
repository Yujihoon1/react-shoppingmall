import React, { useState } from "react";
import { Link } from "react-router-dom";

//로그인 페이지
function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, password }),
    });

    const result = await response.json();
    if (response.ok) {
      //로그인 성공 시
      console.log("로그인 성공");
    } else {
      //로그인 실패 시
      console.log("로그인 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input
            type="text"
            name="id"
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
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

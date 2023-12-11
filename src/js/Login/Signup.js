import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//회원가입 페이지
function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      setMessage("회원가입이 완료되었습니다.");
      //1초 후에 로그인 페이지로 이동하기
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디
          <br />
          <input type="text" name="id" />
        </label>
        <br />
        <label>
          비밀번호
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호 확인
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="회원가입 완료" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//회원가입 페이지
function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 서버에 회원 정보 보내기
    //클라이언트에서 서버로 요청보낼 때는 서버의 전체 URL을 사용해야 함.
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, password }),
    });

    if (response.ok) {
      setMessage("회원가입이 완료되었습니다.");
      //0.5초 후에 로그인 페이지로 이동하기
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      setMessage("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디
          <br />
          <input
            type="text"
            name="id"
            onChange={(e) => setId(e.target.value)}
          />
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

import React from "react";
import { Link } from "react-router-dom";

//로그인 페이지
function Login() {
  return (
    <div>
      <h2>로그인</h2>
      <form>
        <label>
          아이디:
          <input type="text" name="id" />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" name="password" />
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

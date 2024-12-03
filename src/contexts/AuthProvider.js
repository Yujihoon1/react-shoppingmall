import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

// 인증상태 관리하는 컨텍스트 제공 - 인증 관련데이터 변경 가능
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // localStorage에서 사용자 정보와 토큰을 읽어오는 useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // localStorage에서 user 정보 가져오기
      setIsLoggedIn(true); // 사용자 정보가 있으면 로그인 상태로 설정
    }
    if (storedToken) {
      setToken(storedToken); // localStorage에서 토큰 가져오기
    }
  }, []);

  // 상태 변경 시 콘솔에 출력
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("user:", user);
    console.log("token:", token);
  }, [isLoggedIn, user, token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

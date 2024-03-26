import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

// 인증상태 관리하는 컨텍스트 제공 - 인증 관련데이터 변경 가능
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

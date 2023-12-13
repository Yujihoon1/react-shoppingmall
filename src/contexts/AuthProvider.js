import React, { useState } from "react";
import AuthContext from "./AuthContext";

// 인증상태 관리하는 컨텍스트 제공 - 인증 관련데이터 변경 가능
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

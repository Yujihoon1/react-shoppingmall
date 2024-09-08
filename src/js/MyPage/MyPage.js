import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

function MyPage() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/mypage/${user.user_num}`)
        .then((response) => {
          console.log(response.data); // 응답 데이터를 콘솔에 출력
        })
        .catch((error) => {
          console.error("Error:", error); // 에러 발생 시 에러 메시지를 콘솔에 출력
        });
    }
  }, [user]);

  return (
    <div>
      <h2>마이 페이지</h2>
      <p>사용자 이름: {user && user.user_name}</p>
    </div>
  );
}

export default MyPage;

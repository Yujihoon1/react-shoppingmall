import React, { useState } from "react";

function MyInfo({ onMyInfoChange }) {
  const [myInfo, setMyInfo] = useState({
    name: " ",
    phone: " ",
    address: " ",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newMyInfo = { ...myInfo, [name]: value };
    setMyInfo(newMyInfo);
    onMyInfoChange(newMyInfo);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={myInfo.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        type="text"
        name="phone"
        value={myInfo.phone}
        onChange={handleChange}
        placeholder="전화번호"
      />
      <input
        type="text"
        name="address"
        value={myInfo.address}
        onChange={handleChange}
        placeholder="주소"
      />
    </div>
  );
}

export default MyInfo;

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // 현재 수정 중인 사용자

  // 사용자 목록 조회
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        setError("사용자 목록을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 사용자 삭제
  const handleDelete = async (userNum) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userNum}`);
      setUsers(users.filter((user) => user.user_num !== userNum));
    } catch (err) {
      setError("사용자 삭제에 실패했습니다.");
      console.error(err);
    }
  };

  // 수정할 사용자 설정
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // 수정 완료
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/users/${editingUser.user_num}`,
        editingUser
      );
      setUsers(
        users.map((user) =>
          user.user_num === editingUser.user_num ? editingUser : user
        )
      );
      setEditingUser(null); // 수정 완료 후 상태 초기화
    } catch (err) {
      setError("사용자 수정에 실패했습니다.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>유저 관리 페이지</h1>
      <table>
        <thead>
          <tr>
            <th>사용자 번호</th>
            <th>사용자 이름</th>
            <th>사용자 ID</th>
            <th>사용자 등급</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_num}>
              <td>{user.user_num}</td>
              {editingUser && editingUser.user_num === user.user_num ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="user_name"
                      value={editingUser.user_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="user_id"
                      value={editingUser.user_id}
                      onChange={handleChange}
                      disabled // 사용자 ID는 수정할 수 없도록 비활성화
                    />
                  </td>
                  <td>
                    <select
                      name="user_grade"
                      value={editingUser.user_grade}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSave}>저장</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.user_name}</td>
                  <td>{user.user_id}</td>
                  <td>{user.user_grade}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>수정</button>
                    <button onClick={() => handleDelete(user.user_num)}>
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

import React, { useEffect, useState } from "react";
import { getUserAll, User } from "./getUserAll"; // Import the getUserAll function and User interface
import "./Users.css";
import { postFriendRequest } from "./postFriendRequst";

const Users = () => {
  const [userlist, setUserlist] = useState<User[]>([]);

  useEffect(() => {
    getUserAll()
      .then((res) => {
        setUserlist(res.userlist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  const sendFriendRequest = (userId: number) => {
    postFriendRequest(userId)
      .then()
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <div>
        {userlist.map((user) => (
          <div key={user.id} className="user-info">
            <div>ID: {user.username}</div>
            <div>가입날짜: {user.createdAt.slice(0, 10)}</div>
            <div>친구수: {user.friendCount}</div>
            <button onClick={() => sendFriendRequest(user.id)}>친구요청</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

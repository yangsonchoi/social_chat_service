import React, { useEffect, useState } from "react";
import { getUserAll, User } from "./getUserAll";
import "./Users.css";
import { postFriendRequest } from "./postFriendRequst";
import { getFriendssList } from "./getFriendssList";
import { getRequestList } from "./getRequestList";
import { getMyIfno } from "./getMyIfno";

const Users = () => {
  const [myInfo, setMyInfo] = useState<User>();
  const [userlist, setUserlist] = useState<User[]>([]);
  const [friendlist, setFriendlist] = useState<User[]>([]);
  const [friendRequestedlist, setFriendRequestedlist] = useState<User[]>([]);

  useEffect(() => {
    getMyIfno()
      .then((res) => {
        setMyInfo(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getFriendssList()
      .then((res) => {
        setFriendlist(res.userlist);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getRequestList()
      .then((res) => {
        setFriendRequestedlist(res.userlist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getUserAll()
      .then((res) => {
        const filteredUserList = res.userlist.filter(
          (user) => user.id !== myInfo?.id
        );
        setUserlist(filteredUserList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [myInfo]);

  const sendFriendRequest = (userId: number) => {
    postFriendRequest(userId)
      .then(() => {
        const user = userlist.find((u) => u.id === userId);
        if (user) {
          setFriendRequestedlist((prevList) => [...prevList, user]);
        }
      })
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
            {friendlist.some((friend) => friend.id === user.id) ? (
              <div>친구</div>
            ) : friendRequestedlist.some(
                (request) => request.id === user.id
              ) ? (
              <div>요청됨</div>
            ) : (
              <button onClick={() => sendFriendRequest(user.id)}>
                친구요청
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

import React, { useEffect, useState } from "react";
import { User } from "../Users/getUserAll";
import { getFriendssList } from "../Users/getFriendssList";
import { deleteFriend } from "./deleteFriend";

const FriendsList = () => {
  const [friendlist, setFriendlist] = useState<User[]>([]);

  useEffect(() => {
    getFriendssList()
      .then((res) => {
        setFriendlist(res.userlist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const sendDeleteFriend = (userId: number) => {
    deleteFriend(userId)
      .then(() => {
        console.log("request sent");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div>
        {friendlist.map((user) => (
          <div key={user.id} className="user-info">
            <div>ID: {user.username}</div>
            <div>가입날짜: {user.createdAt.slice(0, 10)}</div>
            <button onClick={() => sendDeleteFriend(user.id)}>친구 삭제</button> {/* Delete Friend Button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;

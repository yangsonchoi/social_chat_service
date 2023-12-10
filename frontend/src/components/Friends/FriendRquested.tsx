import React, { useEffect, useState } from "react";
import { getAddresseeList } from "./getAddresseeList";
import { User } from "../Users/getUserAll";
import { putFriendDecline } from "./putFriendDecline";
import { putFriendAccept } from "./putFriendAccept";

const FriendRquested = () => {
  const [friendRequestedlist, setFriendRequestedlist] = useState<User[]>([]);

  useEffect(() => {
    getAddresseeList()
      .then((res) => {
        setFriendRequestedlist(res.userlist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const sendAccept = (userId: number) => {
    putFriendAccept(userId)
      .then(() => {
        console.log("request sent");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendDecline = (userId: number) => {
    putFriendDecline(userId)
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
        {friendRequestedlist.map((user) => (
          <div key={user.id} className="user-info">
            <div>ID: {user.username}</div>
            <div>가입날짜: {user.createdAt.slice(0, 10)}</div>
            <button onClick={() => sendAccept(user.id)}>수락</button>
            <button onClick={() => sendDecline(user.id)}>거절</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRquested;

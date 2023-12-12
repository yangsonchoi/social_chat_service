import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { getMyInfo } from "../Users/getMyInfo";
import { User } from "../Users/getUserAll";
import "./Rooms.css";

const Rooms = () => {
  const [myInfo, setMyInfo] = useState<User>();
  const [roomSelected, setRoomSelected] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [room1Count, setRoom1Count] = useState(0);
  const [room2Count, setRoom2Count] = useState(0);
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState([""]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([""]);

  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setMyInfo(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
    const newSocket = io(
      "http://gamespringtestyachoi.ap-northeast-2.elasticbeanstalk.com/"
      // "http://localhost:8080/"
    );
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.emit("getRoomCount", "room1");
    newSocket.emit("getRoomCount", "room2");

    newSocket.on("room1Count", ({ count: count }) => {
      console.log("room1Count", count);
      setRoom1Count(count);
    });

    newSocket.on("room2Count", ({ count: count }) => {
      console.log("room2Count", count);
      setRoom2Count(count);
    });

    newSocket.on("chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("MemberList", (users) => {
      setUsersInRoom(users);
    });

    newSocket.on("refresh", (roomName) => {
      newSocket.emit("getRoomMember", roomName);
      roomName === "room1"
        ? newSocket.emit("getRoomCount", "room1")
        : newSocket.emit("getRoomCount", "room2");
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (myInfo && socket) {
      socket.emit("name", myInfo.username);
    }
  }, [socket, myInfo]);

  const joinRoom = (roomName: string) => {
    setRoomSelected(true);
    setRoomName(roomName);
    if (socket) {
      socket.emit("join", roomName);
    }
  };

  const sendMessage = () => {
    if (socket && currentMessage.trim() !== "") {
      socket.emit("chat", currentMessage);
      setCurrentMessage("");
    }
  };

  const leaveRoom = () => {
    setRoomSelected(false);
    setMessages([]);
    setUsersInRoom([]);
    if (socket) {
      socket.emit("leave", roomName);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {!roomSelected ? (
        <div>
          <div>
            <h2>Room 1</h2>
            <p>People in this room: {room1Count}</p>
            <button onClick={() => joinRoom("room1")}>Join Room 1</button>
          </div>
          <div>
            <h2>Room 2</h2>
            <p>People in this room: {room2Count}</p>
            <button onClick={() => joinRoom("room2")}>Join Room 2</button>
          </div>
        </div>
      ) : (
        <div className="chat-room-container">
          <div className="room-info">
            <h2>{roomName}</h2>
            <p>
              Number of people: {roomName === "room1" ? room1Count : room2Count}
            </p>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-area">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type a message"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div className="user-list">
            <h3>Users in Room</h3>
            <ul>
              {usersInRoom.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="room-actions">
            <button onClick={leaveRoom}>Leave Room</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;

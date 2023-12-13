import { Server, Socket as IOSocket, RemoteSocket } from "socket.io";
import { Server as HttpServer } from "http";

class Socket {
  private io: Server;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: IOSocket) => {
      this.handleConnection(socket);
    });
  }

  private findSocketByName = async (name: string) => {
    const sockets = await this.io.fetchSockets();
    return sockets.find((socket) => socket.data.username === name);
  };

  private handleConnection(socket: IOSocket): void {
    console.log("A user connected:", socket.id);

    socket.on("name", (name: string) => {
      console.log(name);
      socket.data.username = name;
    });

    socket.on("getRoomCount", (room) => {
      const roomDetails = this.io.sockets.adapter.rooms.get(room);
      const count = roomDetails ? roomDetails.size : 0;
      console.log(count);
      socket.emit(`${room}Count`, { count: count });
    });

    socket.on("getRoomMember", (room) => {
      const roomDetails = this.io.sockets.adapter.rooms.get(room);
      if (roomDetails) {
        const usernames = Array.from(roomDetails).map((socketId) => {
          const roomSocket = this.io.sockets.sockets.get(socketId);
          if (roomSocket) {
            return roomSocket.data.username;
          }
        });
        console.log(usernames);
        socket.emit(`MemberList`, usernames);
      } else {
        console.log(`No users in ${room}`);
        socket.emit(`MemberList`, []);
      }
    });

    socket.on("chat", (msg: string) => {
      console.log("Received message:", socket.id, msg);
      this.io.to(socket.data.room).emit("chat", `${socket.data.username}: ${msg}`);
    });

    socket.on("join", (room) => {
      console.log("Join Room", socket.id, room);
      socket.data.room = room;
      socket.join(room);
      this.io.to(room).emit("refresh", room);
      this.io
        .to(room)
        .emit("chat", `${socket.data.username}님이 방에 입장하셨습니다.`);
    });

    socket.on("leave", (room) => {
      console.log("leave Room", socket.data.username, room);
      socket.leave(room);
	  socket.emit("refresh", room);
	  this.io.to(room).emit("refresh", room);
      this.io.to(room).emit("chat", `${socket.data.username}님이 방을 나갔습니다.`);
    });

    socket.on("message", (receiver: string, msg: string) => {
      console.log("Received message:", socket.id, receiver, msg);
      const handlePrivateMessage = async (receiver: string) => {
        const receiverSocket = await this.findSocketByName(receiver);
        if (receiverSocket) {
          receiverSocket.emit("message", msg);
        } else {
          socket.emit("message", "유저가 채팅방에 없습니다."); // User not in chat room
        }
      };
      handlePrivateMessage(receiver).catch((err) => console.error(err));
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  }
}

export default Socket;

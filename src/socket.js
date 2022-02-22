import io from "socket.io";

class Socket {
  constructor() {
    this.socket = null;
  }

  async setup(server) {
    this.socket = io(server, {
      cors: true,
    });

    this.socket.on("connection", (socket) => {
      console.log("user connected cunt");
    });
  }

  emit(event, data, clientId) {
    if (clientId) {
      console.log("emitted");
      return this.socket.sockets.to(clientId).emit(event, data);
    } else {
      //console.log("emitted else")
      return this.socket.emit(event, data);
    }
  }

  on(event, callBack) {
    console.log("on");
    return this.socket.on(event, callBack);
  }

  off(event) {
    this.socket.off(event);
  }
}

export default new Socket();

// function socketConnection(socket) {
//   socket.on("hello", helloMsg => console.info(`Socket ${socket.id} says: "${helloMsg}"`));
//   socket.emit("welcome", `Welcome! You are visitor number 1}`);
// }

// export default socketConnection

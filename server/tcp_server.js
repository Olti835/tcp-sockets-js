const net = require("net");
const { TCP_PORT, MAX_CONNECTIONS } = require("./config");
const { authenticate } = require("./auth");
const { log } = require("./logger");
const fileManager = require("./file_manager");
const connManager = require("./connection_manager");

const server = net.createServer((socket) => {
  if (connManager.getActiveConnections() >= MAX_CONNECTIONS) {
    socket.write("Server full");
    socket.destroy();
    return;
  }

  connManager.addConnection(socket);

  socket.on("data", (data) => {
    const msg = data.toString();

    log({ event: "MESSAGE", message: msg });

    if (msg === "list") {
      socket.write(JSON.stringify(fileManager.listFiles("./data")));
    }
  });

  socket.on("end", () => {
    connManager.removeConnection(socket);
  });
});

server.listen(TCP_PORT, () => {
  console.log("TCP Server running");
});
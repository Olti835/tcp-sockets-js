const net = require("net");
const { TCP_PORT, MAX_CONNECTIONS } = require("./config");
const { authenticate, isAdmin } = require("./auth");
const fileManager = require("./file_manager");
const connManager = require("./connection_manager");

const server = net.createServer((socket) => {

  if (connManager.getActiveConnections() >= MAX_CONNECTIONS) {
    socket.write("Server full");
    socket.destroy();
    return;
  }

  connManager.addConnection(socket);

  let currentUser = null;

  socket.on("data", (data) => {
    const msg = data.toString().trim();
    const parts = msg.split(" ");

    if (parts[0] === "login") {
      const username = parts[1];
      const password = parts[2];

      const user = authenticate(username, password);

      if (!user) {
        socket.write("Login failed");
      } else {
        currentUser = user;
        socket.write("Login successful");
      }
      return;
    }

    if (!currentUser) {
      socket.write("Login first!");
      return;
    }

    if (parts[0] === "list") {
      socket.write(JSON.stringify(fileManager.listFiles("./data")));
    }

    else if (parts[0] === "delete") {
      if (!isAdmin(currentUser)) {
        socket.write("No permission");
        return;
      }

      fileManager.deleteFile("./data/" + parts[1]);
      socket.write("Deleted");
    }

    else {
      socket.write("Unknown command");
    }
  });

  socket.on("end", () => {
    connManager.removeConnection(socket);
  });

});

server.listen(TCP_PORT, () => {
  console.log("TCP Server running");
});
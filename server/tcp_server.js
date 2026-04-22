const net = require("net");
const path = require("path");

const { TCP_PORT, MAX_CONNECTIONS } = require("./config");
const { login, isAdmin } = require("./auth");
const fileManager = require("./file_manager");
const connManager = require("./connection_manager");
const { llogarit } = require("./math_engine");

const DATA_DIR = path.join(__dirname, "..", "data");

function startTcpServer() {

const server = net.createServer((socket) => {
  if (connManager.getActiveConnections() >= MAX_CONNECTIONS) {
    socket.write("Server full\n");
    socket.destroy();
    return;
  }

  connManager.addConnection();
  console.log("Connections:", connManager.getActiveConnections());

  let currentUser = null;

  socket.on("data", (data) => {
    const msg = data.toString().trim();
    const parts = msg.split(" ");
    const command = parts[0]?.toLowerCase();

    if (command === "login") {
      const username = parts[1];
      const password = parts[2];

      const result = login(username, password);

      if (!result.success) {
        socket.write(result.message + "\n");
      } else {
        currentUser = result.user;
        socket.write("Login successful\n");
      }
      return;
    }

    if (!currentUser) {
      socket.write("Login first!\n");
      return;
    }

    if (command === "list") {
      try {
        const files = fileManager.listFiles(DATA_DIR);
        socket.write(JSON.stringify(files, null, 2) + "\n");
      } catch (err) {
        socket.write("Error while listing files\n");
        console.error("LIST ERROR:", err.message);
      }
      return;
    }


    if (command === 'exit') {
      socket.end();
      return;
    }

    if (command === "read") {
      const filename = parts[1];

      if (!filename) {
        socket.write("Usage: read <filename>\n");
        return;
      }

      try {
        const filePath = path.join(DATA_DIR, filename);
        const content = fileManager.readFile(filePath);
        socket.write(content + "\n");
      } catch (err) {
        socket.write("Error while reading file\n");
        console.error("READ ERROR:", err.message);
      }
      return;
    }

    if (command === "math") {
      const operation = parts[1];

      if (!operation) {
        socket.write("Usage: math 'sum multiply a,b ' or  math 'sum multiply a,b'\n");
        return;
      }

      let a, b;

      if (parts.length >= 4) {
        a = parts[2];
        b = parts[3];
      }
      else if (parts.length >= 3 && parts[2].includes(",")) {
        const nums = parts[2].split(",");
        a = nums[0];
        b = nums[1];
      }
      else {
        socket.write("Usage: math <sum|multiply> <a> <b>  ose  math <sum|multiply> a,b\n");
        return;
      }

      try {
        const result = llogarit(operation, a, b);
        socket.write(`Result: ${result}\n`);
      } catch (err) {
        socket.write("Error while calculating\n");
        console.error("MATH ERROR:", err.message);
      }
      return;
    }

    // DELETE
    if (command === "delete") {
      if (!isAdmin(currentUser)) {
        socket.write("No permission\n");
        return;
      }

      const filename = parts[1];

      if (!filename) {
        socket.write("Usage: delete <filename>\n");
        return;
      }

      try {
        const filePath = path.join(DATA_DIR, filename);
        fileManager.deleteFile(filePath);
        socket.write("Deleted\n");
      } catch (err) {
        socket.write("Error while deleting file\n");
        console.error("DELETE ERROR:", err.message);
      }
      return;
    }

    socket.write("Unknown command\n");
  });

  socket.on("end", () => {
    connManager.removeConnection();
    console.log("Connections:", connManager.getActiveConnections());
  });


  socket.on("error", (err) => {
    console.error("SOCKET ERROR:", err.message);
    connManager.removeConnection();
    console.log("Connections:", connManager.getActiveConnections());
  });
});

server.listen(TCP_PORT, () => {
  console.log("TCP Server running");
});

}

module.exports = {
    startTcpServer
};
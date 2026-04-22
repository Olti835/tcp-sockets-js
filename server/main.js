const { startTcpServer } = require("./tcp_server");
const { startHttpServer } = require("./http_server");

startTcpServer();
startHttpServer();
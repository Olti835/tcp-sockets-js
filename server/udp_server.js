const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const { HOST, PORT } = require("./config");
const { register, login } = require("./auth");
const { calc } = require("./math_engine");
const { logMessage } = require("./logger");
const { startHTTP } = require("./http_server");
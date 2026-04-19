const connections = new Set();

function addConnection(socket) {
  connections.add(socket);
}

function removeConnection(socket) {
  connections.delete(socket);
}

function getActiveConnections() {
  return connections.size;
}

module.exports = {
  addConnection,
  removeConnection,
  getActiveConnections
};
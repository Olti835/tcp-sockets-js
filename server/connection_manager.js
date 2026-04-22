let connections = {count: 0}; 

function addConnection() {
  connections.count++;
}

function removeConnection() {
  connections.count--;
}

function getActiveConnections() {
  return connections.count;
}

module.exports = {
  addConnection,
  removeConnection,
  getActiveConnections
};
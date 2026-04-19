const fs = require('fs');
const config = require('./config');
const connectionManager = require('./connection_manager');



function getStats() {
    let stats = {
        status: "online",
        activeConnections: 0,
        totalLogs: 0,
        totalMessages: 0,
        timestamp: new Date().toISOString()
    };
  

    try {
        if (typeof connectionManager.getActiveCount === 'function') {
            stats.activeConnections = connectionManager.getActiveCount();
        }
    } catch (error) {
        console.error("Error fetching active connections:", error.message);
    }

    try {
      
        if (fs.existsSync(config.LOGS_FILE)) {
            const logsData = fs.readFileSync(config.LOGS_FILE, 'utf8');
            const logsArray = JSON.parse(logsData);
            stats.totalLogs = logsArray.length;
        }
      
    } catch (error) {
        console.error("Warning: Could not read logs.json properly.");
    }

  
    try {
        if (fs.existsSync(config.MESSAGES_FILE)) {
            const messagesData = fs.readFileSync(config.MESSAGES_FILE, 'utf8');
            const messagesArray = JSON.parse(messagesData);
            stats.totalMessages = messagesArray.length;
        }
    } catch (error) {
        console.error("Warning: Could not read messages.json properly.");
    }

    return stats;
}


module.exports = {
    getStats
};

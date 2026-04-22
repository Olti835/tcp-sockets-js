const http = require('http');
const config = require('./config');
const statsManager = require('./stats_manager');

const handleRequest = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'GET' && req.url === '/stats') {
        const stats = statsManager.getStats();
        const acceptHeader = req.headers.accept || '';
        
        if (acceptHeader.includes('text/html')) {
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server Monitor</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        background-color: #f0f2f5;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        color: #333;
                    }
                    .dashboard {
                        background-color: white;
                        padding: 30px 40px;
                        border-radius: 12px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                        width: 350px;
                    }
                    h2 {
                        text-align: center;
                        color: #1a73e8;
                        margin-top: 0;
                        margin-bottom: 25px;
                        border-bottom: 2px solid #f0f2f5;
                        padding-bottom: 10px;
                    }
                    .stat-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid #f0f2f5;
                        font-size: 16px;
                    }
                    .stat-row:last-child {
                        border-bottom: none;
                    }
                    .label {
                        font-weight: 600;
                        color: #5f6368;
                    }
                    .value {
                        font-weight: bold;
                        color: #202124;
                    }
                    .status-online {
                        color: #0f9d58;
                        background: #e6f4ea;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 14px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        color: #9aa0a6;
                    }
                </style>
            </head>
            <body>
                <div class="dashboard">
                    <h2>📊 System Monitor</h2>
                    
                    <div class="stat-row">
                        <span class="label">Server Status</span>
                        <span class="value status-online">● ${stats.status.toUpperCase()}</span>
                    </div>
                    
                    <div class="stat-row">
                        <span class="label">Active Connections</span>
                        <span class="value">${stats.activeConnections}</span>
                    </div>
                    
                    

                    <div class="footer">
                        Last Updated: ${new Date(stats.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            </body>
            </html>
            `;
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(stats, null, 4));
        }
        return;
    }

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Server Monitor is Online</h2>
                <p>Click here to view the stats: <a href="/stats" style="color: #1a73e8; font-weight: bold;">/stats</a></p>
            </body>
        `);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Not Found", message: "Try GET /stats" }));
};

const server = http.createServer(handleRequest);

function startHttpServer() {
    const port = config.HTTP_PORT || 8080; 
    
    server.listen(port, () => {
        console.log('\n=================================================');
        console.log(`[HTTP SERVER] Monitoring interface is LIVE`);
        console.log(` View stats at: http://localhost:${port}/stats`);
        console.log('=================================================\n');
    });
}

module.exports = {
    startHttpServer
};
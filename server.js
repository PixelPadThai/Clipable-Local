import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Constants
const PORT = 5554;
const HOST = '0.0.0.0'; // Bind to all interfaces for network access
const DB_FILE = path.join(__dirname, 'clipboard-db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
async function initializeDatabase() {
  try {
    await fs.access(DB_FILE);
  } catch {
    const initialData = {
      area_1: '',
      area_2: ''
    };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('📝 Database file created:', DB_FILE);
  }
}

// Read database
async function readDatabase() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading database:', error);
    return { area_1: '', area_2: '' };
  }
}

// Write to database
async function writeDatabase(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error writing to database:', error);
    return false;
  }
}

// WebSocket connection handling
const clients = new Set();

wss.on('connection', async (ws) => {
  console.log('🔗 New client connected. Total clients:', clients.size + 1);
  clients.add(ws);

  // Send current data to newly connected client
  const currentData = await readDatabase();
  ws.send(JSON.stringify({
    type: 'init',
    data: currentData
  }));

  // Handle messages from clients
  ws.on('message', async (message) => {
    try {
      const { type, areaName, content } = JSON.parse(message);
      
      if (type === 'update') {
        // Update database
        const currentData = await readDatabase();
        currentData[areaName] = content;
        
        if (await writeDatabase(currentData)) {
          // Broadcast to all other clients
          const updateMessage = JSON.stringify({
            type: 'update',
            areaName,
            content
          });
          
          clients.forEach(client => {
            if (client !== ws && client.readyState === 1) { // WebSocket.OPEN = 1
              client.send(updateMessage);
            }
          });
          
          console.log(`📝 Updated ${areaName}: ${content.length} characters`);
        }
      }
    } catch (error) {
      console.error('❌ Error processing message:', error);
    }
  });

  // Handle client disconnect
  ws.on('close', () => {
    clients.delete(ws);
    console.log('❌ Client disconnected. Total clients:', clients.size);
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
    clients.delete(ws);
  });
});

// REST API endpoints
app.get('/api/clipboard/:areaName', async (req, res) => {
  const { areaName } = req.params;
  const data = await readDatabase();
  
  if (data.hasOwnProperty(areaName)) {
    res.json({ content: data[areaName] });
  } else {
    res.status(404).json({ error: 'Area not found' });
  }
});

app.post('/api/clipboard/:areaName', async (req, res) => {
  const { areaName } = req.params;
  const { content } = req.body;
  
  const currentData = await readDatabase();
  currentData[areaName] = content || '';
  
  if (await writeDatabase(currentData)) {
    // Broadcast to all WebSocket clients
    const updateMessage = JSON.stringify({
      type: 'update',
      areaName,
      content: content || ''
    });
    
    clients.forEach(client => {
      if (client.readyState === 1) { // WebSocket.OPEN = 1
        client.send(updateMessage);
      }
    });
    
    res.json({ success: true, content: content || '' });
    console.log(`📝 API Updated ${areaName}: ${(content || '').length} characters`);
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    clients: clients.size,
    database: DB_FILE
  });
});

// Initialize and start server
async function startServer() {
  await initializeDatabase();
  
  server.listen(PORT, HOST, () => {
    console.log('🚀 Clipboard server started!');
    console.log(`📡 HTTP API: http://${HOST}:${PORT}`);
    console.log(`🔌 WebSocket: ws://${HOST}:${PORT}`);
    console.log(`📁 Database: ${DB_FILE}`);
    console.log('');
  });
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}); 
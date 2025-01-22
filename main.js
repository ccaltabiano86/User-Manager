const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios'); // Use axios to interact with the local API

let mainWindow;

// Create the main window
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
});

// IPC handlers
ipcMain.handle('fetch-users', async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    return response.data; // Return user list to the renderer process
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('Failed to fetch users');
  }
});

ipcMain.handle('add-user', async (event, user) => {
  try {
    const response = await axios.post('http://localhost:3000/users', user);
    return response.data; // Return the added user's details
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw new Error('Failed to add user');
  }
});

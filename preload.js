const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetchUsers: () => ipcRenderer.invoke('fetch-users'),
  addUser: (user) => ipcRenderer.invoke('add-user', user),
});
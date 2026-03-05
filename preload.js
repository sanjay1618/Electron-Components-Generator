const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('myAPI',{
    getComponentsList : () => ipcRenderer.invoke('get-template-names')
});
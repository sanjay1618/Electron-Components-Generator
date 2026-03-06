const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('myAPI',{
    getComponentsList : () => ipcRenderer.invoke('get-template-names'),
    getComponentData : (folderName) => ipcRenderer.invoke('get-component-data', folderName),
    exportFinalFile : (finalHTML) => ipcRenderer.invoke('export-final-html', finalHTML)

});
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('get-template-names', async () => {
        const templatesPath = path.join(app.getAppPath(), 'templates');
    
        try {
            
            if (!fs.existsSync(templatesPath)) {
                
                fs.mkdirSync(templatesPath);
                return [];
            }
            const files = fs.readdirSync(templatesPath, { withFileTypes: true });
    
         
            const folderNames = files
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
    
            return folderNames; 
        } catch (err) {
            console.error("Failed to read templates directory:", err);
            return [];
        }
    });
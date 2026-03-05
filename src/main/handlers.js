const fs = require('fs');
const path = require('path');
const { ipcMain, app, dialog } = require('electron');


const getTemplateNamesList =  async () => {
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
};



function regiserHandlers() {
    ipcMain.handle('get-template-names',getTemplateNamesList);
}

module.exports = {
    regiserHandlers
}
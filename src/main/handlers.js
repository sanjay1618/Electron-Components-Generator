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


const getComponentData = async (event, folderName) => {
    const componentPath = path.join(app.getAppPath(), 'templates', folderName);
    
    
    const config = fs.readFileSync(path.join(componentPath, 'config.json'), 'utf8');
    const template = fs.readFileSync(path.join(componentPath, 'template.hbs'), 'utf8');
    const css = fs.readFileSync(path.join(componentPath, 'style.css'), 'utf8');


    return {
        config: config,     
        template: template, 
        css: css   
    };
}

const exportFinalHTML =  async (event, finalHTML) => {
    // 1. Open the System Save Dialog
    const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'Save Component HTML',
        defaultPath: 'academic-affairs-component',
        filters: [
            { name: 'HTML Files', extensions: ['html'] },
            { name: 'All Files', extensions: ['*'] },
            { name: 'Text File', extensions: ['txt']}
        ]
    });

    // 2. If the user didn't hit 'Cancel'
    if (!canceled && filePath) {
        try {
            // 3. Write the string to the physical file
            fs.writeFileSync(filePath, finalHTML, 'utf8');
            return { success: true, path: filePath };
        } catch (error) {
            console.error("Failed to save file:", error);
            return { success: false, error: error.message };
        }
    }

    return { success: false, reason: 'User canceled' };
}




function regiserHandlers() {
    ipcMain.handle('get-template-names',getTemplateNamesList);
    ipcMain.handle('get-component-data', getComponentData);
    ipcMain.handle('export-final-html',exportFinalHTML);
}

module.exports = {
    regiserHandlers
}
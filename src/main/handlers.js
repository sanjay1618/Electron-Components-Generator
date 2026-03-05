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

function regiserHandlers() {
    ipcMain.handle('get-template-names',getTemplateNamesList);
    ipcMain.handle('get-component-data', getComponentData)
}

module.exports = {
    regiserHandlers
}
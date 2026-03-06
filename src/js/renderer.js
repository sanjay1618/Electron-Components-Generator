
import { generateHTML } from './generator.js';


let activeComponentData = {
    template: '',
    css: '',
    config: null
};

async function initSidebar() {
   
    const folders = await window.myAPI.getComponentsList();
    console.log(folders);

    const listContainer = document.getElementById('component-list');
    listContainer.innerHTML = ''; 

    
    folders.forEach(folderName => {
        const btn = document.createElement('button');
        btn.classList.add('component-btn');
        btn.innerText = folderName.toUpperCase(); 
        
       
        btn.onclick = () => loadComponent(folderName);
        
        listContainer.appendChild(btn);
    });
}



initSidebar();



const formContainer = document.getElementById('form-insertion-point');
const generateSaveBtn = document.getElementById('generate-save-btn');

async function loadComponent(folderName) {
    
    if (!folderName) {
        console.error("folderName is undefined!");
        return;
    }
    try {
        
        const data = await window.myAPI.getComponentData(folderName);

        //Saving the info to the global state.
        activeComponentData.template = data.template;
        activeComponentData.css = data.css;
        activeComponentData.config = JSON.parse(data.config);
        
        
        const config = JSON.parse(data.config);

        
        document.getElementById('active-component-name').innerText = config.displayName;

        
        import('./form-builder.js').then(module => {
            module.buildForm(config, formContainer);
        });

        generateSaveBtn.disabled = false; 
        generateSaveBtn.innerText = "Generate & Save HTML";
        
    } catch (err) {
        console.error("Error loading component UI:", err);
        formContainer.innerHTML = `<p style="color:red">Error: Could not load the form for ${folderName}</p>`;
    }
   
}

generateSaveBtn.onclick = async () => {
    console.log("button clicked");
    
    const finalHtml = generateHTML(
        activeComponentData.template, 
        activeComponentData.css
    );
    await window.myAPI.exportFinalFile(finalHtml);
    
    console.log("Component successfully generated and sent to save dialog.");
};

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


async function loadComponent(folderName) {

    if (!folderName) {
        console.error("folderName is undefined!");
        return;
    }
    try {
        
        const data = await window.myAPI.getComponentData(folderName);
        
        
        const config = JSON.parse(data.config);

        
        document.getElementById('active-component-name').innerText = config.displayName;

        
        import('./form-builder.js').then(module => {
            module.buildForm(config, formContainer);
        });
        
    } catch (err) {
        console.error("Error loading component UI:", err);
        formContainer.innerHTML = `<p style="color:red">Error: Could not load the form for ${folderName}</p>`;
    }
}
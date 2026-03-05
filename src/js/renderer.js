
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
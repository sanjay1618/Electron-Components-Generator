
export function buildForm(config, container) {
    container.innerHTML = `<h3>${config.displayName}</h3>`;
    
    const form = document.createElement('div');
    form.id = 'active-form';

    config.fields.forEach((field, index) => {
        
        if (index % 5 === 0) {
            const header = document.createElement('h4');
            header.innerText = `Card ${Math.floor(index / 5) + 1}`;
            header.style.marginTop = "20px";
            form.appendChild(header);
        }

        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
            <label>${field.label}</label>
            <input type="${field.type}" id="${field.id}" class="form-input">
        `;
        form.appendChild(group);
    });

    container.appendChild(form);
}


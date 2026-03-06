export function buildForm(config, container) {
    container.innerHTML = `<h2 style="color: #4b2e83; margin-bottom: 20px;">${config.displayName}</h2>`;
    
    const form = document.createElement('div');
    form.id = 'active-form';

    config.fields.forEach((field, index) => {
        // Create Section Header every 5 fields
        if (index % 5 === 0) {
            const header = document.createElement('h4');
            header.innerText = `Profile Card ${Math.floor(index / 5) + 1}`;
            form.appendChild(header);
        }

        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
            <label for="${field.id}">${field.label}</label>
            <input 
                type="${field.type}" 
                id="${field.id}" 
                class="form-input" 
                placeholder="Enter ${field.label.toLowerCase()}..."
            >
        `;
        form.appendChild(group);
    });

    container.appendChild(form);
}
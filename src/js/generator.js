export function generateHTML(templateHtml, componentCss) {
    let finalHtml = templateHtml;
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        if (input.id.includes('_text') && !input.value.trim()) {
            
            const linkNum = input.id.split('_')[0]; 
            
           
            const regex = new RegExp(`<a[^>]*{{${linkNum}_url}}[^>]*>{{${linkNum}_text}}</a>`, 'g');
            
           
            finalHtml = finalHtml.replace(regex, '');
        }
    });

    inputs.forEach(input => {
        const placeholder = `{{${input.id}}}`;
        finalHtml = finalHtml.replaceAll(placeholder, input.value || '');
    });

    return `
        <style>${componentCss}</style>
        ${finalHtml.trim()}
    `;
}
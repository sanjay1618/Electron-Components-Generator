
export function generateHTML(templateHtml, componentCss) {
    let finalHtml = templateHtml;
    const inputs = document.querySelectorAll('.form-input');

   
    inputs.forEach(input => {
        const placeholder = `{{${input.id}}}`;
        finalHtml = finalHtml.replaceAll(placeholder, input.value || '');
    });

    return `
        <style>${componentCss}</style>
        ${finalHtml}
    `;
}


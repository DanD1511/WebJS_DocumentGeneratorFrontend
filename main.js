async function generateDocument() {
    const formData = new FormData();
    const templateFile = document.getElementById('template').files[0];
    const dataFile = document.getElementById('data').files[0];

    if (!templateFile || !dataFile) {
        alert("Por favor, selecciona ambos archivos antes de generar el documento.");
        return;
    }

    formData.append('template', templateFile);
    formData.append('data', dataFile);

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        // Directamente intentamos descargar el blob sin verificar la cabecera 'Content-Disposition'
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        // Puedes especificar un nombre de archivo predeterminado aquí si lo deseas
        a.download = "documento_generado.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        alert("Documento generado con éxito y descarga iniciada.");
    } catch (error) {
        console.error('Error:', error);
        alert(`Ocurrió un error al generar el documento: ${error.message}`);
    }
}

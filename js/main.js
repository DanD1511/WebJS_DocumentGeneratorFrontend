async function generateDocument() {
    const formData = new FormData();
    const templateFile = document.getElementById('template').files[0];
    const dataFile = document.getElementById('data').files[0];
    const loadingDiv = document.getElementById('loading');
    const downloadLinkDiv = document.getElementById('downloadLink');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!templateFile || !dataFile) {
        alert("Por favor, selecciona ambos archivos antes de generar el documento.");
        return;
    }

    formData.append('template', templateFile);
    formData.append('data', dataFile);

    // Mostrar la animación de carga
    loadingDiv.style.display = 'block';
    downloadLinkDiv.style.display = 'none'; // Asegurarse de que el enlace de descarga está oculto

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        loadingDiv.style.display = 'none'; // Ocultar la animación de carga

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        // Mostrar el enlace de descarga y preparar el botón de descarga
        downloadLinkDiv.style.display = 'block';
        downloadBtn.onclick = function() {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = "documento_generado.docx"; // Especificar el nombre de archivo predeterminado
            document.body.appendChild(a);
            a.click();
            a.remove();
        };
    } catch (error) {
        console.error('Error:', error);
        alert(`Ocurrió un error al generar el documento: ${error.message}`);
    }
}

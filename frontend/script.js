// Función para realizar la solicitud POST al backend Flask
function searchFoodBackend(query) {
    const apiUrl = 'http://localhost:5000/search-food'; // URL de la ruta en el backend
    const appId = '665b1a51'; // Reemplaza 'TU_APP_ID' con tu ID de la aplicación de Edamam
    const appKey = '4b442ce0a0076d4dce58156cce6dbb51'; // Reemplaza 'TU_APP_KEY' con tu clave de API de Edamam

    // Objeto con los datos a enviar al backend (término de búsqueda, ID de la aplicación y clave de API)
    const requestData = {
        searchTerm: query,
        appId: appId,
        appKey: appKey
    };

    axios.post(apiUrl, requestData)
        .then(response => {
            const data = response.data;
            if (data.calories) {
                // Construir el HTML para mostrar la información nutricional
                const resultHTML = `
                    <h2>${query}</h2>
                    <p>Calorías: ${data.calories}</p>
                    <p>Proteína: ${data.totalNutrients.PROCNT.quantity} ${data.totalNutrients.PROCNT.unit}</p>
                    <p>Grasa: ${data.totalNutrients.FAT.quantity} ${data.totalNutrients.FAT.unit}</p>
                    <p>Carbohidratos: ${data.totalNutrients.CHOCDF.quantity} ${data.totalNutrients.CHOCDF.unit}</p>
                    <p>Fibra: ${data.totalNutrients.FIBTG.quantity} ${data.totalNutrients.FIBTG.unit}</p>
                `;

                // Mostrar los resultados en el contenedor
                document.getElementById('results').innerHTML = resultHTML;
            } else {
                document.getElementById('results').innerHTML = '<p>No se encontraron resultados.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
        });
}

// Manejar el evento de envío del formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    const searchTerm = document.getElementById('search-input').value;
    searchFoodBackend(searchTerm); // Llamar a la función para enviar la solicitud al backend
});

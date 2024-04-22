from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/search-food', methods=['POST'])
def search_food():
    try:
        # Obtener el término de búsqueda enviado desde el frontend
        search_term = request.json['searchTerm']
        
        # Tu App ID y App Key de Edamam
        app_id = '665b1a51'
        app_key = '4b442ce0a0076d4dce58156cce6dbb51'
        
        # Construir la URL de la API de Edamam
        url = f'https://api.edamam.com/api/nutrition-data?app_id={app_id}&app_key={app_key}&ingr={search_term}'
        
        # Hacer la solicitud a la API de Edamam
        response = requests.get(url)
        
        # Obtener los datos de la respuesta de la API
        data = response.json()
        
        # Devolver los datos al frontend
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

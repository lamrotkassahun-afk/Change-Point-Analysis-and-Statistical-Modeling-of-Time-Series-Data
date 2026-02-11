from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Dynamically find the path relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Try this path - it removes the 'backend/' prefix since you are already inside it
# This goes up one level to find the root 'data' folder
# Try this path - it removes the 'backend/' prefix since you are already inside it
DATA_PATH = os.path.join('data', 'raw', 'BrentOilPrices.csv')
@app.route('/api/prices', methods=['GET'])
def get_prices():
    try:
        if not os.path.exists(DATA_PATH):
            return jsonify({"error": f"File not found at {DATA_PATH}"}), 404
            
        df = pd.read_csv(DATA_PATH)
        # Convert to list of dicts for React
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
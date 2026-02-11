from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allows React to communicate with Flask

# Load data exported from Task 2
prices_df = pd.read_csv('processed_data/prices.csv')
events_df = pd.read_csv('processed_data/events.csv')

# i. Endpoint for Historical Price Data
@app.route('/api/prices', methods=['GET'])
def get_prices():
    return jsonify(prices_df.to_dict(orient='records'))

# ii. Endpoint for Change Point & Event Correlation Data
@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events_df.to_dict(orient='records'))

# iii. Summary Metrics (Volatility, Avg Change)
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    # Example metric calculation
    avg_price = prices_df['Price'].mean()
    return jsonify({
        "avg_pr ice": round(avg_price, 2),
        "total_events": len(events_df)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
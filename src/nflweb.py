from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained models
with open('model.pkl', 'rb') as file:
    total_model = pickle.load(file)  # Model for 'Over/Under' prediction

with open('spread.pkl', 'rb') as file:
    spread_model = pickle.load(file)  # Model for 'Spread' prediction

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract the games from the request
        games = data['games']
        feature_names = ['Spread', 'Total']
        predictions = []

        for game in games:
            # Prepare input data for both models
            input_data = pd.DataFrame([[game['Spread'], game['Total']]], columns=feature_names)

            # Predict the spread using the 'spread.pkl' model
            spread_prediction = spread_model.predict(input_data)

            # Predict 'Over/Under' using the 'model.pkl' for totals
            total_prediction = total_model.predict(input_data)

            # Map predictions to labels
            spread_prediction_label = spread_prediction[0]  
            total_prediction_label = 'Under' if total_prediction[0] == 1 else 'Over'

            predictions.append({
                'game': game['Game'],
                'spread': game['Spread'],
                'predicted_spread': spread_prediction_label,
                'total': game['Total'],
                'predicted_outcome': total_prediction_label,
            })

        return jsonify(predictions=predictions)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

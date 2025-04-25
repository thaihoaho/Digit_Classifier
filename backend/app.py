from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load knn_model
knn_model = joblib.load("knn_model.pkl.gz")

@app.route("/")
def home():
    return "ML backend is running!"

@app.route("/predict/knn", methods=["POST"])
def predict_knn():
    data = request.get_json()
    features = np.array(data["features"]).reshape(1, -1)
    prediction = knn_model.predict(features)
    return jsonify({"prediction": int(prediction[0])})

nn_model = tf.keras.models.load_model('nn_model.keras')

@app.route("/predict/nn", methods=["POST"])
def predict_nn():
    data = request.get_json()
    features = np.array(data["features"]).reshape(1, -1)
    prediction = nn_model.predict(features)
    y_pred = np.argmax(prediction, axis=1)
    return jsonify({"prediction": y_pred.item()})

if __name__ == "__main__":
    app.run(debug=True)


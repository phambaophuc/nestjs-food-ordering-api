from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load pre-trained PhoBERT model and tokenizer
model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

# Define emotion labels
emotion_labels = ["Negative", "Positive", "Neutral"]

# Function to predict emotion from text
def predict_emotion(text):
    # Tokenize input text
    input_ids = torch.tensor([tokenizer.encode(text)])

    # Make prediction
    with torch.no_grad():
        outputs = model(input_ids)
        probabilities = torch.softmax(outputs.logits, dim=-1).squeeze()

    # Get predicted class
    predicted_class = torch.argmax(probabilities).item()

    return emotion_labels[predicted_class]

# API endpoint for emotion prediction
@app.route('/predict-emotion', methods=['POST'])
@cross_origin()
def predict_emotion_api():
    data = request.get_json()
    text = data['text']

    # Predict emotion
    emotion = predict_emotion(text)

    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)

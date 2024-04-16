from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Tải mô hình và mã thông báo PhoBERT được đào tạo trước
model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

# Định nghĩa cảm xúc  
emotion_labels = ["Negative", "Positive", "Neutral"]

# Dự đoán cảm xúc từ văn bản
def predict_emotion(text):
    # Mã hóa văn bản đầu vào
    input_ids = torch.tensor([tokenizer.encode(text)])

    # Đưa ra dự đoán
    with torch.no_grad():
        outputs = model(input_ids)
        probabilities = torch.softmax(outputs.logits, dim=-1).squeeze()

    # Nhận lớp dự đoán
    predicted_class = torch.argmax(probabilities).item()

    return emotion_labels[predicted_class]

# API endpoint
@app.route('/predict-emotion', methods=['POST'])
@cross_origin()
def predict_emotion_api():
    data = request.get_json()
    text = data['text']

    # Dự đoán cảm xúc
    emotion = predict_emotion(text)

    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)

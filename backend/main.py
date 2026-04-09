from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Fake News Detection API")

# Setup CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load BERT model and tokenizer
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bert_dir = os.path.join(base_dir, 'model', 'saved_models', 'bert_model')

try:
    tokenizer = AutoTokenizer.from_pretrained(bert_dir)
    model = AutoModelForSequenceClassification.from_pretrained(bert_dir)
    model.eval()  # Set to evaluation mode
    print("BERT Model loaded successfully.")
except Exception as e:
    print(f"Error loading models (Did you train it first?): {e}")
    tokenizer = None
    model = None

# Initialize Gemini Client
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    gemini_client = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    gemini_client = None

class NewsInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Fake News Detection API is running."}

@app.post("/analyze")
def analyze(news: NewsInput):
    if not tokenizer or not model:
        raise HTTPException(status_code=500, detail="Model not loaded. Ensure BERT model is trained and saved.")
    
    if not gemini_client:
        raise HTTPException(status_code=500, detail="Gemini client not configured. Check GEMINI_API_KEY.")
    
    # 1. Prediction using BERT
    try:
        inputs = tokenizer(news.text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        with torch.no_grad():
            outputs = model(**inputs)
        
        logits = outputs.logits
        probabilities = torch.nn.functional.softmax(logits, dim=-1)[0]
        
        predicted_class_id = torch.argmax(logits, dim=-1).item()
        
        # Labels: Fake = 0, Real = 1
        label = "Real" if predicted_class_id == 1 else "Fake"
        confidence = probabilities[predicted_class_id].item() * 100
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing text through BERT: {e}")

    # 2. Explanation using Google Gemini
    # Limit input text length conceptually so we don't blow up token limits for the API
    snippet = news.text[:1000] + ("..." if len(news.text) > 1000 else "")
    
    prompt = f"You are a helpful AI fact-checking assistant. Provide a concise, 1-2 paragraph explanation.\n\nExplain why the following news is {label} in simple terms: {snippet}"
    
    try:
        response = gemini_client.generate_content(
            prompt,
            generation_config={"max_output_tokens": 250, "temperature": 0.7}
        )
        explanation = response.text.strip()
    except Exception as e:
        explanation = f"Could not generate explanation due to an error with Google Gemini API: {e}"

    return {
        "result": label,
        "confidence": round(confidence, 2),
        "explanation": explanation
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

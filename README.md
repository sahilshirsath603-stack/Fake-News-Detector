# Hybrid Fake News Detection System (BERT + GPT)

A complete full-stack machine learning application built to classify news articles as **Fake** or **Real** utilizing a state-of-the-art Hugging Face BERT Transformer model, integrated with conversational AI models for deep contextual explanations.

## Architecture

*   **Model Pipeline (`/model`)**: Scripts to ingest dataset, tokenize text, and train a powerful `bert-base-uncased` sequence classifier utilizing the Hugging Face `Trainer` API.
*   **Backend API (`/backend`)**: A robust `FastAPI` endpoint (`/analyze`). Loads the PyTorch BERT models dynamically and interfaces with the OpenAI API (`gpt-4o-mini`) to generate a human-readable explanation of why a news article was deemed fake or real based on context.
*   **Frontend UI (`/frontend`)**: A visually excellent, glassmorphism-inspired React (Vite) interface styled using Tailwind CSS v4 and `framer-motion` for ultra-smooth interactive transitions.

## Quickstart Guide

### 1. Prep Environment
```bash
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
```

### 2. Configure OpenAI API Key
Inside the `backend/` folder, copy `.env.example` to `.env`:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and paste your valid OpenAI API key.

### 3. Generate Dummy Data (If needed)
If you don't have the original `Fake.csv` / `True.csv` from Kaggle, use our dummy generator:
```bash
python generate_data.py
```

### 4. Train the BERT Model
**Warning**: Training BERT natively on a CPU can take a significant amount of time. It is recommended to run this script on a Kaggle Notebook or Google Colab with GPU access if you want quick results.
```bash
cd model
python train_bert.py
```
*This will generate `bert_model/` inside `model/saved_models/` which FastAPI requires.*

### 5. Run the Backend API
```bash
cd backend
python main.py
```
*API will run on `http://localhost:8000`.*

### 6. Run the Frontend App
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

## Deployment Notes
- **Render (Backend)**: We provided a `render.yaml` file to use Render's Blueprint specification. Simply point Render to your github repository, and it will auto-configure the FastAPI server using `uvicorn`. Make sure you inject `OPENAI_API_KEY` into Render's Environment Variable settings.
- **Vercel (Frontend)**: Point Vercel to your repository. Select the Framework Preset: `Vite`. Set the Root Directory to `frontend`. **CRITICAL**: Before deploying, update `App.jsx` and change `http://localhost:8000/analyze` to your new live Render URL!

import pandas as pd
import re
import string
import joblib
import os
import nltk
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Ensure stopwords are downloaded (handles running this the first time)
nltk.download('stopwords', quiet=True)
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    # Lowercase
    text = text.lower()
    # Remove punctuation
    text = re.sub(f"[{re.escape(string.punctuation)}]", '', text)
    # Remove stopwords
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return ' '.join(words)

def train_model():
    print("Loading datasets...")
    # Load data
    true_df = pd.read_csv('../data/True.csv')
    fake_df = pd.read_csv('../data/Fake.csv')

    # Add labels: Real = 1, Fake = 0
    true_df['label'] = 1
    fake_df['label'] = 0

    # Combine
    df = pd.concat([true_df, fake_df], ignore_index=True)

    # We use 'text' column for prediction
    print("Preprocessing text... this may take a moment.")
    df['clean_text'] = df['text'].apply(preprocess_text)

    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(df['clean_text'], df['label'], test_size=0.2, random_state=42)

    # TF-IDF Vectorization
    print("Vectorizing text...")
    vectorizer = TfidfVectorizer(max_features=5000)
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # Logistic Regression
    print("Training Logistic Regression model...")
    model = LogisticRegression()
    model.fit(X_train_vec, y_train)

    # Evaluation
    predictions = model.predict(X_test_vec)
    acc = accuracy_score(y_test, predictions)
    prec = precision_score(y_test, predictions)
    rec = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)

    print(f"\n--- Model Evaluation ---")
    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1-Score:  {f1:.4f}")

    # Save models
    os.makedirs('saved_models', exist_ok=True)
    joblib.dump(vectorizer, 'saved_models/vectorizer.pkl')
    joblib.dump(model, 'saved_models/model.pkl')
    print("\nModel and vectorizer saved successfully to 'saved_models/'")

if __name__ == "__main__":
    train_model()

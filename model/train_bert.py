import pandas as pd
import os
import torch
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    acc = accuracy_score(labels, preds)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

def train_bert_model():
    print("Loading datasets...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    true_df = pd.read_csv(os.path.join(base_dir, 'data', 'True.csv'))
    fake_df = pd.read_csv(os.path.join(base_dir, 'data', 'Fake.csv'))

    true_df['label'] = 1
    fake_df['label'] = 0

    df = pd.concat([true_df, fake_df], ignore_index=True)
    # Shuffle dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    texts = df['text'].tolist()
    labels = df['label'].tolist()

    print("Loading BERT tokenizer...")
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    class FakeNewsDataset(torch.utils.data.Dataset):
        def __init__(self, encodings, labels):
            self.encodings = encodings
            self.labels = labels

        def __getitem__(self, idx):
            item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
            item['labels'] = torch.tensor(self.labels[idx])
            return item

        def __len__(self):
            return len(self.labels)

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, random_state=42)
    
    print("Tokenizing the dataset...")
    # Reduced max_length to 128 for significantly faster training and evaluation,
    # specifically since the dataset might contain very long text arrays.
    train_encodings = tokenizer(X_train, truncation=True, padding=True, max_length=128)
    test_encodings = tokenizer(X_test, truncation=True, padding=True, max_length=128)

    train_dataset = FakeNewsDataset(train_encodings, y_train)
    test_dataset = FakeNewsDataset(test_encodings, y_test)

    print("Loading pre-trained BERT model for sequence classification...")
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

    model_dir = os.path.dirname(os.path.abspath(__file__))
    
    training_args = TrainingArguments(
        output_dir=os.path.join(model_dir, 'results'),
        num_train_epochs=3,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=64,
        warmup_steps=500,
        weight_decay=0.01,
        logging_steps=10,
        eval_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=test_dataset,
        compute_metrics=compute_metrics
    )

    print("Starting training (this may take a long time on CPU)...")
    trainer.train()

    print("Evaluating model...")
    results = trainer.evaluate()
    print("Evaluation Results:", results)

    # Save model and tokenizer
    out_dir = os.path.join(model_dir, 'saved_models', 'bert_model')
    os.makedirs(out_dir, exist_ok=True)
    model.save_pretrained(out_dir)
    tokenizer.save_pretrained(out_dir)
    print(f"Model and tokenizer successfully saved to {out_dir}")

if __name__ == "__main__":
    train_bert_model()

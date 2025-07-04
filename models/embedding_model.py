# models/embedding_model.py

import requests
import os

HF_API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

def get_embedding(text: str):
    response = requests.post(HF_API_URL, headers=headers, json={"inputs": text})
    response.raise_for_status()
    return response.json()[0]

def get_jd_embedding(jd_text: str):
    return get_embedding(jd_text)

def get_resume_embedding(resume_text: str):
    return get_embedding(resume_text)

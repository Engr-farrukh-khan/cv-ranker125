from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.parser import extract_text_from_pdf
from utils.ranker import rank_resume
from models.embedding_model import get_jd_embedding, get_resume_embedding
from fastapi import UploadFile, File
from typing import List
from fastapi import FastAPI, UploadFile, File, Form

app = FastAPI()
# CORS (so frontend on Vercel can talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://cv-ranker125-lqv4s59me-farrukh-noor-khans-projects.vercel.app/"],  # replace with Vercel domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI"}

@app.post("/rank")
@app.post("/rank")
async def rank_resumes(
    job_description: str = Form(...),
    files: List[UploadFile] = File(...)
):
    jd_embedding = get_jd_embedding(job_description)
    ranked = []
    for file in files:
        contents = await file.read()
        resume_text = extract_text_from_pdf(contents)
        resume_embedding = get_resume_embedding(resume_text)
        score = rank_resume(jd_embedding, resume_embedding)
        ranked.append({"filename": file.filename, "score": score})
    ranked.sort(key=lambda x: x['score'], reverse=True)
    return {"results": ranked}

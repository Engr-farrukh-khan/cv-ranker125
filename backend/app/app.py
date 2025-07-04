from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from utils.parser import extract_text_from_pdf
from utils.ranker import rank_resume
from models.embedding_model import get_jd_embedding, get_resume_embedding

app = FastAPI()

# ✅ CORS Configuration: Add your frontend Vercel domain here
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://cv-ranker125-ev65.vercel.app",  # ✅ your deployed frontend domain
        "http://localhost:3000",                 # optional for local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Root route for health check
@app.get("/")
def root():
    return {"message": "Hello from FastAPI"}

# ✅ Resume ranking endpoint
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
        ranked.append({
            "filename": file.filename,
            "score": score
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return {"results": ranked}

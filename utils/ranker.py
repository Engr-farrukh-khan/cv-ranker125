from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def rank_resume(jd_embedding, resume_embedding):
    score = cosine_similarity([jd_embedding], [resume_embedding])[0][0]
    return float(score) * 100

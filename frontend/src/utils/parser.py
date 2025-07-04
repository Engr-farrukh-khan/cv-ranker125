from pdfminer.high_level import extract_text
import io

def extract_text_from_pdf(pdf_bytes):
    with io.BytesIO(pdf_bytes) as pdf_stream:
        return extract_text(pdf_stream)

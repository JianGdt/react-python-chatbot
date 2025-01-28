from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/chat")
def chat_with_bot(request: QueryRequest):
    query = request.query
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            query,
            generation_config=genai.GenerationConfig(
                max_output_tokens=75,
                temperature=0.7
            )
        )
        return {"response": response.text if hasattr(response, "text") else "Hmm, I don't have an answer for that!"}
    except Exception as e:
        return {"response": f"Oops! Something went wrong: {e}"}

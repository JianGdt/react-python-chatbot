import os
from fastapi import FastAPI, Depends
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import pyttsx3
import threading
from routes.auth import router as auth_router  
from auth import get_current_user

load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:8000", "https://react-py-chatbot.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth") 


class QueryRequest(BaseModel):
    query: str
class SpeechRequest(BaseModel):
    text: str

@app.post("/chat")
async def chat_with_bot(request: QueryRequest, current_user: dict = Depends(get_current_user)):
    print("🔹 Authenticated User:", current_user)  
    query = request.query
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            query,
            generation_config=genai.GenerationConfig(
                max_output_tokens=3000,
                temperature=0.7
            )
        )
        return {"response": response.text if hasattr(response, "text") else "Hmm, I don't have an answer for that!"}
    except Exception as e:
        return {"response": f"Oops! Something went wrong: {e}"}


def speak_text(text):
    def run():
        engine = pyttsx3.init()
        engine.setProperty("rate", 150) 
        engine.setProperty("volume", 1.0)  
        engine.say(text)
        engine.runAndWait()
        engine.stop() 

    thread = threading.Thread(target=run)
    thread.start()


@app.post("/speak")
def text_to_speech(request: SpeechRequest):
    speak_text(request.text)
    return {"message": "Speaking..."}

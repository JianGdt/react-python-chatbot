import os
import jwt as pyjwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from database import get_user_by_username, get_user_by_id

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in the environment variables!")

ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def authenticate_user(username: str, password: str):
    user = await get_user_by_username(username)  
    if not user:
        return None 
    if not verify_password(password, user["password"]): 
        return None  
    return user


def create_jwt_token(data: dict):
    data["user_id"] = str(data["user_id"])
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(days=1)
    return pyjwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    print("Received Token:", token)  
    try:
        payload = pyjwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Decoded Token Payload:", payload) 
        user_id: str = payload.get("user_id")
        if not user_id:
            print("Invalid token: No user_id found")
            raise HTTPException(status_code=401, detail="Invalid token: No user_id found")
        user = await get_user_by_id(user_id)
        print("Fetched User from DB:", user)  
        if not user:
            print("User not found in database!")
            raise HTTPException(status_code=401, detail="User not found in database")
        return user
    except pyjwt.ExpiredSignatureError:
        print("Token expired")
        raise HTTPException(status_code=401, detail="Token expired")
    except pyjwt.PyJWTError as e:
        print("JWT Error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")




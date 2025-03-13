from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from auth import create_jwt_token, hash_password, get_current_user, verify_password
from database import users_collection, get_user_by_username
from bson import ObjectId
import traceback


router = APIRouter()

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister):
    existing_user = await users_collection.find_one({"email": user.email}) 
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed_password = hash_password(user.password)
    new_user = {
        "_id": ObjectId(), 
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
    }
    await users_collection.insert_one(new_user)  
    print("Registered User:", new_user)  
    return {"message": "User registered successfully"}




@router.post("/login")
async def login(request: UserLogin):
    print("Received:", request.dict()) 
    try:
        username = request.username 
        password = request.password
        user = await get_user_by_username(username)
        print("User found:", user)  
        if not user:
            print("User not found")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if not verify_password(password, user["password"]):
            print("Password mismatch")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        user_id = str(user["_id"])
        print("User ID being stored in token:", user_id)  
        access_token = create_jwt_token({"user_id": user_id})
        print("Generated Token:", access_token)  
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print("Login Error:", traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal server error")




@router.get("/users")
async def read_current_user(current_user: dict = Depends(get_current_user)):
    return {
        "_id": str(current_user["_id"]),
        "username": current_user["username"]
    }

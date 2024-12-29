from fastapi import FastAPI, HTTPException, Body, Depends, Request, Security
from pydantic import BaseModel, Field
from typing import List, Optional
from pymongo import MongoClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
import base64
import json
import time
from util import defaultMetadata
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
USERS_COLLECTION = os.getenv("USERS_COLLECTION")
SECRET_KEY = os.getenv("SECRET_KEY")

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
metadata_collection = db[COLLECTION_NAME]
users_collection = db[USERS_COLLECTION]

# FastAPI application setup
app = FastAPI(
    title="Blog API",
    description="API for blog metadata management",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add security scheme
security = HTTPBearer()

# Helper functions for token management
def generate_token(username: str):
    payload = {
        "username": username,
        "timestamp": int(time.time())
    }
    token = base64.b64encode(json.dumps(payload).encode()).decode()
    return token

def decode_token(token: str):
    try:
        decoded = base64.b64decode(token).decode()
        payload = json.loads(decoded)
        return payload
    except Exception:
        return None

def get_authenticated_user(token: str):
    payload = decode_token(token)
    if not payload or "username" not in payload:
        return None
    user = users_collection.find_one({"username": payload["username"]})
    return user

# Password management functions
def hash_password(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

# Models
class User(BaseModel):
    username: str
    password: str

class AuthorAchievement(BaseModel):
    title: str
    description: str
    link: str

class AuthorExperience(BaseModel):
    title: str
    company: str
    period: str
    highlights: List[str]

class AuthorEducation(BaseModel):
    degree: str
    school: str
    year: str
    honors: Optional[str]

class AuthorSocial(BaseModel):
    twitter: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    email: Optional[str]

class Author(BaseModel):
    name: str
    username: str
    tagline: str
    bio: str
    avatar: str
    achievements: List[AuthorAchievement]
    experience: List[AuthorExperience]
    education: List[AuthorEducation]
    social: AuthorSocial

class Category(BaseModel):
    icon: str
    title: str
    description: str
    color: str
    tag: str
    coverImage: str

class Tag(BaseModel):
    name: str
    slug: str
    description: str

class Series(BaseModel):
    title: str
    description: str
    icon: str
    color: str
    rating: float
    articleCount: int
    readCount: str

class SiteMetadata(BaseModel):
    title: str
    description: str
    siteUrl: str
    author: Author
    categories: List[Category]
    tags: List[Tag]
    seriesList: List[Series]

class SiteInfo(BaseModel):
    title: Optional[str]
    description: Optional[str]
    siteUrl: Optional[str]

class TagsPayload(BaseModel):
    tags: List[Tag]

class CategoriesPayload(BaseModel):
    categories: List[Category]

class SeriesPayload(BaseModel):
    series: List[Series]

def insert_default_metadata(username: str):
    metadata = defaultMetadata
    metadata["author"]["username"] = username
    metadata["username"] = username
    metadata_collection.insert_one(metadata)

# Routes for authentication
@app.post("/register")
def register_user(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = hash_password(user.password)
    users_collection.insert_one({"username": user.username, "hashed_password": hashed_password})
    insert_default_metadata(user.username)
    token = generate_token(user.username)
    return {"token": token}

@app.post("/login")
def login_user(user: User):
    existing_user = users_collection.find_one({"username": user.username})
    if not existing_user or not verify_password(user.password, existing_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = generate_token(user.username)
    return {"token": token}

# Helper function
def get_metadata(username: str):
    metadata = metadata_collection.find_one({"username": username})
    if metadata:
        metadata["id"] = str(metadata["_id"])
        del metadata["_id"]
    return metadata

# Dependency for authentication
async def authenticate_request(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    user = get_authenticated_user(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

@app.get("/me")
def get_user(user = Depends(authenticate_request)):
    return {
        "username": user["username"]
    }
# Routes for metadata
@app.get("/metadata", response_model=SiteMetadata)
async def fetch_metadata(user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    return metadata

@app.get("/public/metadata", response_model=SiteMetadata)
async def fetch_metadata(username: str):
    metadata = get_metadata(username)
    if not metadata:
        return defaultMetadata
    return metadata

@app.post("/metadata", response_model=SiteMetadata)
async def create_metadata(metadata: SiteMetadata, user = Depends(authenticate_request)):
    if metadata_collection.find_one({"username": user["username"]}):
        raise HTTPException(status_code=400, detail="Metadata already exists")
    metadata_collection.insert_one({**metadata.dict(), "username": user["username"]})
    return metadata

@app.put("/metadata", response_model=SiteMetadata)
def update_metadata(metadata: SiteMetadata, request: Request):
    user = authenticate_request(request)
    existing_metadata = metadata_collection.find_one({"username": user["username"]})
    if not existing_metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": metadata.dict()})
    return metadata

@app.patch("/metadata/siteinfo")
def update_siteinfo(data: SiteInfo, user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": data.dict()})
    return {"message": "Site info updated successfully"}

@app.patch("/metadata/author")
def update_author(author: Author, user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": {"author": author.dict()}})
    return {"message": "Author details updated successfully"}

@app.patch("/metadata/categories")
def update_categories(categories: CategoriesPayload, user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": {"categories": [cat.dict() for cat in categories.categories]}})
    return {"message": "Categories updated successfully"}

@app.patch("/metadata/tags")
def update_tags(data: TagsPayload, user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": {"tags": [tag.dict() for tag in data.tags]}})
    return {"message": "Tags updated successfully"}

@app.patch("/metadata/series")
def update_series(data: SeriesPayload, user = Depends(authenticate_request)):
    metadata = get_metadata(user["username"])
    if not metadata:
        raise HTTPException(status_code=404, detail="Metadata not found")
    metadata_collection.update_one({"username": user["username"]}, {"$set": {"seriesList": [series.dict() for series in data.series]}})
    return {"message": "Series updated successfully"}

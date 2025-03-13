INSTALLED_APPS = [
    'corsheaders',
    ...
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://react-py-chatbot.vercel.app/"
]

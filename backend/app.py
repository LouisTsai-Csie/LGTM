from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from routes.group import router as group_router
from routes.common import router as common_router

app = FastAPI()

path = '/api/v1.0'

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router
app.include_router(user_router, prefix=f'{path}/user')
app.include_router(group_router, prefix=f'{path}/group')
app.include_router(common_router, prefix=f'{path}/common')
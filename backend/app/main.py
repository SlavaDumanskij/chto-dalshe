from fastapi import FastAPI
from app.config import settings
from app.routers import health
from app.api.activities import router as activities_router
from app.api.users import router as users_router

app=FastAPI(title=settings.PROJECT_NAME)

app.include_router(health.router)
app.include_router(activities_router)
app.include_router(users_router)

@app.get("/")
def read_root():
    return {"message":"Welcome to the API"}

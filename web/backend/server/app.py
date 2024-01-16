from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .base_router import main_router
from .database import engine
from .models import models


models.Base.metadata.create_all(bind=engine)


def get_client_data():
    return {}


app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8080/api/portfolios/",
    "http://localhost:3000/api/portfolios"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.mount("/static", StaticFiles(directory="client/build/static"), name="static")
templates = Jinja2Templates(directory="client/build")


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    client_data = get_client_data()
    return templates.TemplateResponse("index.html", {"request": request, "clientData": client_data})

app.include_router(main_router)
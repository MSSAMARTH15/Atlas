from fastapi import FastAPI

from backend.routes import router
from fastapi.middleware.cors import CORSMiddleware
from backend.document_download import router as docs_router

app = FastAPI(
    title="Atlas API",
    version="1.0.0"
)
app.include_router(docs_router)
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message": "Atlas Backend Running"
    }
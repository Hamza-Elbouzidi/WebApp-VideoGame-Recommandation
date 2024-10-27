import pandas as pd
import textdistance 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_distances

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

game_db = pd.read_parquet("../data/game_database.parquet")
game_embeddings = np.array(game_db.embedding.tolist())



@app.get("/")
def index():
    return {"Hello world"}


@app.get("/search")
def search(query: str):
    distances = game_db["name"].apply(lambda v : textdistance.levenshtein(v,query)).sort_values()
    return [{"game": json.loads(game_db.loc[idx].to_json()),"distance" : distance} for idx, distance
            in distances[:3].items()]

@app.get("/recommend")
def recommend(appid: int):
    game_row = game_db[game_db["appid"] == appid].iloc[0]
    distances = cosine_distances(np.array([game_row.embedding]),
    game_embeddings)[0]
    sorted_indices = distances.argsort()
    return [json.loads(game_db.iloc[idx].to_json()) for idx in sorted_indices
    [1:5]]
    
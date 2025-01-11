"use client";

import { Input } from "@/components/ui/input";
import Head from "next/head";
import { useState } from "react";

type Game = {
  name: string;
  appid: number;
  header_image: string;
  short_description: string;
  detailed_description: string;
  genres: string;
  embedding: number[];
}

type SearchResults = {
  game: Game;
  distance: number;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState([] as SearchResults[]);
  const [recommendations, setRecommandations] = useState([] as Game[]);

  return (
    <div className="font-poppins">
      <Head>
        <title>Game Oracle</title>
      </Head>

      <header className="header">
        <h1 className="logo">
          <a >Game Oracle</a>
        </h1>
      </header>

      <main>
        <div className="content">
          <h2>Welcome to Game Oracle, start typing to find your game recommendations</h2>
          <Input type="search" className="searchbar" placeholder="Enter text" onChange={(e) => {
            fetch('http://localhost:8000/search?' + new URLSearchParams({ query: e.target.value })).then((res) => res.json()).then((data) => {
              console.log(data);
              setSearchResults(data as SearchResults[]);
            });
          }} />


          {searchResults.length !== 0 && <><h1>Search Results</h1>
            <div className="results">
              {searchResults.map((result, idx) => <>
                <div key={idx} className="result" onClick={(e) => {
                  fetch('http://localhost:8000/recommend?appid=' + result.game.appid)
                    .then((res) => res.json()).then((data) => {
                      console.log(data);
                      setRecommandations(data as Game[]);
                    })
                }}>
                  <h2 className="resultName">{result.game.name}</h2>
                  <img src={result.game.header_image} />
                </div>
              </>)}
            </div></>}

        </div>
      </main>


      {recommendations.length !== 0 && <><h1>Recommendations</h1>
        <div className="recommendations">
          {recommendations.map((game, idx) => <>
            <div key={idx} className="recommandation">
              <img src={game.header_image} />
              <h2 className="gameName">{game.name}</h2>
              <p className="Game Description">{game.short_description}</p>
            </div>
          </>)}
        </div></>}

      <footer>
      </footer>
    </div>
  );
}

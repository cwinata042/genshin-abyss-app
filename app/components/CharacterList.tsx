import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "./types";
const { v4 } = require("uuid");

export default async function CharacterList() {
  const res = await fetch(`https://knbr-genshin-api.vercel.app/api/characters`);
  const characterData: Character[] = await res.json();

  const characterList = characterData.map((character) => {
    return <CharacterCard key={v4()} characterInfo={character} />;
  });

  return <div className="character-list">{characterList}</div>;
}

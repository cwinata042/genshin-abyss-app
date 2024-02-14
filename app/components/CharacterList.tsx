import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "./types";

async function getCharacterData() {
  const res = await fetch(`https://knbr-genshin-api.vercel.app/api/characters`);

  console.log("Fetching data!");
  const characterData: Character[] = await res.json();
  return characterData;
}

export default async function CharacterList() {
  const characters = await getCharacterData();

  const characterList = characters.map((character) => {
    return <CharacterCard key={character.char_id} characterInfo={character} />;
  });

  return <div className="character-list">{characterList}</div>;
}

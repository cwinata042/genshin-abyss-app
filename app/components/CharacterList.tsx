import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "./types";

export default function CharacterList() {
  const alhaitham: Character = {
    char_id: 1,
    name: "Alhaitham",
    gender: "Male",
    rarity: 5,
    element: "Dendro",
    weapon: "Sword",
    region: "Sumeru",
    profile_img:
      "https://genshin.honeyhunterworld.com/img/alhatham_078_icon.webp?x54247",
  };

  const kaveh: Character = {
    char_id: 2,
    name: "Kaveh",
    gender: "Male",
    rarity: 4,
    element: "Dendro",
    weapon: "Claymore",
    region: "Sumeru",
    profile_img:
      "https://genshin.honeyhunterworld.com/img/kaveh_081_icon.webp?x54247",
  };

  const characters: Character[] = [alhaitham, kaveh];

  const characterList = characters.map((character) => {
    return <CharacterCard key={character.char_id} characterInfo={character} />;
  });

  return <div className="character-list">{characterList}</div>;
}

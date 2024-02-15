import React from "react";
import { Character, FilterType } from "./types";
import CharacterCard from "./CharacterCard";
const { v4 } = require("uuid");

export default function CharacterList(props: { ownedCharacters: Character[] }) {
  const [filteredChars, setFilteredChars] = React.useState(
    props.ownedCharacters.map((character) => {
      return { ...character, isVisible: true };
    })
  );

  const characterCardList = filteredChars.map((character) => {
    return <CharacterCard key={v4()} characterInfo={character} />;
  });
  return <div className="character-list">{characterCardList}</div>;
}

import React from "react";
import { Character, FilterType } from "./types";
import CharacterCard from "./CharacterCard";
const { v4 } = require("uuid");

export default function CharacterList(props: {
  ownedCharacters: Character[];
  currFilters: string[][];
}) {
  let filteredChars = props.ownedCharacters;
  // Finds all characters with a matching element filter
  if (props.currFilters[0].length > 0) {
    filteredChars = filteredChars.filter((char) => {
      return props.currFilters[0].some((element) => element === char.element);
    });
  }
  // Finds all characters with a matching weapon type filter using array above
  if (props.currFilters[1].length > 0) {
    filteredChars = filteredChars.filter((char) => {
      return props.currFilters[1].some(
        (weapon_type) => weapon_type === char.weapon
      );
    });
  }
  // Finds all characters with a matching rarity filter using array above
  if (props.currFilters[2].length > 0) {
    filteredChars = filteredChars.filter((char) => {
      return props.currFilters[2].some(
        (rarity) => (rarity === "five_star" ? 5 : 4) === char.rarity
      );
    });
  }
  // Finds all characters with a matching gender filter using array above
  if (props.currFilters[3].length > 0) {
    filteredChars = filteredChars.filter((char) => {
      return props.currFilters[3].some((gender) => gender === char.gender);
    });
  }

  const characterCardList = filteredChars.map((character) => {
    return <CharacterCard key={v4()} characterInfo={character} />;
  });

  return <div className="character-list">{characterCardList}</div>;
}

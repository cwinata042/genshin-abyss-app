"use client";

import React from "react";
import CharacterCard from "./CharacterCard";
import { Character, FilterType } from "./types";
import Filters from "./Filters";
const { v4 } = require("uuid");

export default function Characters(props: {
  ownedCharacters: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  const [filteredChars, setFilteredChars] = React.useState(
    props.ownedCharacters.map((character) => {
      return { ...character, isVisible: true };
    })
  );

  function filterChars(filterName: string, filterType: string) {
    setFilteredChars((prevFilteredChar) => {
      return prevFilteredChar;
    });
  }

  const characterCardList = filteredChars.map((character) => {
    return <CharacterCard key={v4()} characterInfo={character} />;
  });

  return (
    <div className="characters">
      <div className="character-list">{characterCardList}</div>
      <Filters
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
        setFilters={filterChars}
      />
    </div>
  );
}

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
  console.log(filteredChars);

  function filterChars(filterName: string, filterType: string) {
    setFilteredChars((prevFilteredChars) => {
      const filteredChars = prevFilteredChars.filter((character) => {
        switch (filterName) {
          case "element":
            return character.element === filterType;
          case "weapon_type":
            return character.weapon === filterType;
          case "rarity":
            return character.rarity === (filterType === "5 star" ? 5 : 4);
          case "gender":
            return character.gender === filterType;
          default:
            return false;
        }
      });
      return filteredChars;
    });

    console.log("filtering characters");
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

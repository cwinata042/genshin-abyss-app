"use client";

import React from "react";
import CharacterCard from "./CharacterCard";
import { Character, FilterType } from "./types";
import Filters from "./Filters";
import CharacterList from "./CharacterList";

export default function Characters(props: {
  ownedCharacters: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  handleToggle: Function;
  renderBans: boolean;
}) {
  const emptyFilters: string[][] = [[], [], [], []];

  const [currFilters, setCurrFilters] = React.useState(emptyFilters);

  // Adds or removes a filter to its filter type
  function setFilters(filterType: string, filterName: string) {
    let index: number;
    if (filterType === "element") {
      index = 0;
    } else if (filterType === "weapon_type") {
      index = 1;
    } else if (filterType === "rarity") {
      index = 2;
    } else {
      index = 3;
    }

    const newFilters = currFilters.map((currFilterType, i) => {
      if (i === index && !currFilterType.includes(filterName)) {
        return [...currFilterType, filterName];
      } else if (i === index) {
        return currFilterType.filter((filter) => filter !== filterName);
      } else {
        return currFilterType;
      }
    });

    setCurrFilters(newFilters);
  }

  function clearFilters() {
    if (currFilters.flat().length > 0) {
      setCurrFilters(emptyFilters);
    }
  }

  return (
    <div className="characters">
      <CharacterList
        ownedCharacters={props.ownedCharacters}
        currFilters={currFilters}
        handleToggle={props.handleToggle}
        renderBans={props.renderBans}
      />
      <Filters
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
        setFilters={setFilters}
        clearFilters={clearFilters}
        currFilters={currFilters}
      />
    </div>
  );
}

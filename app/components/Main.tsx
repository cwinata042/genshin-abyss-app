import React from "react";
import { Character, FilterType } from "./types";
import Characters from "./Characters";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  // ADD THIS LATER
  function toggleSelectedChars(char_id: number) {
    console.log(`toggling character with id: ${char_id}!`);
  }

  return (
    <div className="main">
      <Characters
        ownedCharacters={props.allChars}
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
        handleToggle={toggleSelectedChars}
        renderBans={true}
      />
      <div className="team-builder">
        <div className="randomizer-options">OPTIONS</div>
        <div className="teams">TEAMS</div>
      </div>
    </div>
  );
}

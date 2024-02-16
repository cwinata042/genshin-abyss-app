import React from "react";
import { Character, FilterType } from "./types";
import Characters from "./Characters";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  return (
    <div className="main">
      <Characters
        ownedCharacters={props.allChars}
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
      />
      <div className="team-builder">
        <div className="options">OPTIONS</div>
        <div className="teams">TEAMS</div>
      </div>
    </div>
  );
}

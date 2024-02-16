import React from "react";
import { Character, FilterType } from "./types";
import Characters from "./Characters";

export default function Options(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  toggleOptions: Function;
}) {
  return (
    <div className="options-overlay">
      <div className="options-window">
        <Characters
          ownedCharacters={props.allChars}
          elementData={props.elementData}
          weaponTypeData={props.weaponTypeData}
        />
        <button className="close-options" onClick={() => props.toggleOptions()}>
          {" "}
          CLOSE{" "}
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Character, FilterType } from "./types";
import Options from "./Options";
import Main from "./Main";

export default function Container(props: {
  allCharData: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  const [allChars, setAllChars] = React.useState(
    props.allCharData.map((char) => {
      return {
        ...char,
        isOwned: false,
        state: "Default",
        teamPosition: -1,
      };
    })
  );

  function setOwned(newOwned: Character[]) {
    setAllChars(newOwned);
  }

  const [showOptions, setShowOptions] = React.useState(false);

  function toggleOptions() {
    setShowOptions((prevShow) => !prevShow);
  }

  return (
    <div className="container">
      {showOptions && (
        <Options
          allChars={allChars}
          elementData={props.elementData}
          weaponTypeData={props.weaponTypeData}
          toggleOptions={toggleOptions}
          setOwned={setOwned}
        />
      )}
      <div className="wrapper">
        <div className="header">
          <div className="header-info">Genshin Abyss Randomizer</div>
          <button className="show-options" onClick={() => toggleOptions()}>
            <div className="show-options-text">Edit Character List</div>
            <img
              className="options-icon"
              src="/icons/other/Icon_Settings.webp"
              alt="Options icon."
            ></img>
          </button>
        </div>
        <Main
          allChars={allChars}
          elementData={props.elementData}
          weaponTypeData={props.weaponTypeData}
        />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Character, FilterType, State } from "./types";
import Options from "./Options";
import Main from "./Main";

export default function Container(props: {
  allCharData: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  const [allChars, setAllChars] = React.useState<Character[]>(
    props.allCharData
      .map((char) => {
        return {
          ...char,
          isOwned: true,
          state: State.Default,
          teamPosition: -1,
        };
      })
      .sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      })
  );

  function updateOwned(newOwned: Character[]) {
    setAllChars(
      newOwned.sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      })
    );
  }

  function setState(state: State, chars: number[]) {
    const newChars: Character[] = allChars.map((char) => {
      if (chars.includes(char.char_id)) {
        return {
          ...char,
          state: state,
        };
      } else {
        return char;
      }
    });

    setAllChars(newChars);
  }

  function resetState() {
    const newChars: Character[] = allChars.map((char) => {
      return {
        ...char,
        state: State.Default,
      };
    });

    setAllChars(newChars);
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
          setOwned={updateOwned}
        />
      )}
      <div className="wrapper">
        <div className="header">
          <div className="header-info">Genshin Abyss Randomizer</div>
          <button className="reset-picks" onClick={() => resetState()}>
            <div className="show-options-text">Reset Bans/Locks</div>
          </button>
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
          setState={setState}
        />
      </div>
    </div>
  );
}

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
          currentTeam: -1,
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
        if (state === State.Use) {
          return {
            ...char,
            state: state,
            teamPosition: -1,
            currentTeam: -1,
          };
        } else {
          return {
            ...char,
            state: state,
          };
        }
      } else {
        return char;
      }
    });

    setAllChars(newChars);
  }

  function togglePosition(position: number, team: number, char_id: number) {
    const newChars: Character[] = allChars.map((char) => {
      if (char.char_id === char_id) {
        return {
          ...char,
          teamPosition: char.teamPosition === position ? -1 : position,
          currentTeam: char.currentTeam === team ? -1 : team,
          state: char.teamPosition === position ? State.Default : State.Pick,
        };
      } else {
        return char;
      }
    });

    setAllChars(newChars);
  }

  function lockCharPositions(
    positions: number[],
    teams: number[],
    char_ids: number[]
  ) {
    const newChars: Character[] = allChars.map((char) => {
      if (char.state === State.Lock) {
        return {
          ...char,
          state: State.Default,
        };
      }
      if (char_ids.includes(char.char_id)) {
        return {
          ...char,
          state: State.Lock,
          teamPosition: positions[char_ids.indexOf(char.char_id)],
          currentTeam: teams[char_ids.indexOf(char.char_id)],
        };
      } else {
        return char;
      }
    });

    setAllChars(newChars);
  }

  function resetBansLocks() {
    const newChars: Character[] = allChars.map((char) => {
      if (char.state === State.Ban || char.state === State.Lock) {
        return {
          ...char,
          state: State.Default,
        };
      } else {
        return char;
      }
    });

    setAllChars(newChars);
  }

  function resetUsed() {
    const newChars: Character[] = allChars.map((char) => {
      if (char.state === State.Use) {
        return {
          ...char,
          state: State.Default,
          teamPosition: -1,
          currentTeam: -1,
        };
      } else {
        return char;
      }
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
          <button className="reset-bans" onClick={() => resetBansLocks()}>
            <div className="show-options-text">Reset Bans/Locks</div>
          </button>
          <button className="reset-picks" onClick={() => resetUsed()}>
            <div className="show-options-text">Reset Used Characters</div>
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
          togglePosition={togglePosition}
          lockCharPositions={lockCharPositions}
        />
      </div>
    </div>
  );
}

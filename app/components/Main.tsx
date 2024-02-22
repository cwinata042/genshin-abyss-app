import React from "react";
import { Character, FilterType, State } from "./types";
import Characters from "./Characters";
import Selector from "./Selector";
import Team from "./Team";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  setState: Function;
  togglePosition: Function;
}) {
  const [selectedTeam, setSelectedTeam] = React.useState(0);

  const defaultChar: Character = {
    char_id: -1,
    name: "--",
    gender: "None",
    rarity: -1,
    element: "None",
    weapon: "None",
    region: "None",
    profile_img: "/img/Default_Icon.svg",
    isOwned: true,
    state: State.Default,
    teamPosition: 0,
  };

  const [selectedChars, setSelectedChars] = React.useState(() => {
    let defaultArr: Character[][] = [[], []];

    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 4; y++) {
        defaultArr[x][y] = {
          ...defaultChar,
          teamPosition: y,
        };
      }
    }

    return defaultArr;
  });

  const sortedOwned = props.allChars.toSorted((a, b) => {
    return b.state - a.state;
  });

  // ADD THIS LATER
  function toggleSelectedChars(char_id: number) {
    const newChar: Character = props.allChars.filter((char) => {
      return char.char_id === char_id;
    })[0];

    let newSelected: Character[][] = selectedChars;
    const foundSelected: boolean =
      selectedChars[selectedTeam].filter((char) => {
        return char.char_id === char_id;
      }).length === 1;

    let index: number;

    // Do not continue if character is banned or locked
    if (
      newChar.state !== State.Default ||
      selectedChars[selectedTeam][3].char_id !== -1
    ) {
      return;
    } else if (!foundSelected) {
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === -1;
      });
    } else {
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === char_id;
      });
    }

    newSelected[selectedTeam][index] = newChar;
    props.togglePosition(index, char_id);
    setSelectedChars(newSelected);
  }

  return (
    <div className="main">
      <Characters
        ownedCharacters={sortedOwned}
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
        handleToggle={toggleSelectedChars}
        renderBans={true}
      />
      <div className="team-builder">
        <Selector
          selectedChars={selectedChars}
          ownedCharacters={props.allChars}
          setState={props.setState}
        />
        <Team
          selectedChars={selectedChars}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          handleToggle={toggleSelectedChars}
        />
      </div>
    </div>
  );
}

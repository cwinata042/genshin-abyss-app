import React from "react";
import { Character, FilterType, State } from "./types";
import Characters from "./Characters";
import Selector from "./Selector";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  setState: Function;
}) {
  // ADD THIS LATER
  function toggleSelectedChars(char_id: number) {
    console.log(`toggling character with id: ${char_id}!`);
  }

  const [selectedChars, setSelectedChars] = React.useState(() => {
    let defaultArr: Character[][] = [[], []];
    let defaultChar: Character = {
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
        <div className="teams">TEAMS</div>
      </div>
    </div>
  );
}

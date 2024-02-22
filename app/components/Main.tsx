import React from "react";
import { Character, FilterType } from "./types";
import Characters from "./Characters";
import Selector from "./Selector";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
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
      state: "Default",
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
        <Selector
          selectedChars={selectedChars}
          ownedCharacters={props.allChars}
        />
        <div className="teams">TEAMS</div>
      </div>
    </div>
  );
}

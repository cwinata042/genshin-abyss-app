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
  lockCharPositions: Function;
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

  const defaultArr: Character[][] = [[], []];

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 4; y++) {
      defaultArr[x][y] = {
        ...defaultChar,
        teamPosition: y,
      };
    }
  }

  const [selectedChars, setSelectedChars] = React.useState(defaultArr);

  const sortedOwned = [...props.allChars].sort((a, b) => {
    return b.state - a.state;
  });

  function setLockedChars(lockedChars: number[]) {
    // Reset selectedChars list to all defaults
    let newSelectedChars = defaultArr;
    let indices: number[] = [];

    for (let i = 0; i < lockedChars.length; i++) {
      // For first half of lockedChars list, add to 1st team
      // For second half of lockedChars list, add to 2nd team
      let team = i < lockedChars.length / 2.0 ? 0 : 1;
      let index = team === 0 ? i : i - Math.ceil(lockedChars.length / 2);
      const lockedChar: Character = props.allChars.filter((char) => {
        return char.char_id === lockedChars[i];
      })[0];

      // Add character to selectedChars
      newSelectedChars[team][index] = { ...lockedChar, state: State.Lock };

      // Add position to indeces
      indices.push(index);
    }
    props.lockCharPositions(indices, lockedChars);

    console.log(newSelectedChars);
    setSelectedChars(newSelectedChars);
  }

  function toggleSelectedChars(char_id: number) {
    // Finds the selected character
    const newChar: Character = props.allChars.filter((char) => {
      return char.char_id === char_id;
    })[0];

    // Sets up new selected character array
    let newSelected: Character[][] = selectedChars;

    // Determines if character is in selected or other team
    const otherTeam: number = selectedTeam === 0 ? 1 : 0;
    const foundSelected: boolean =
      selectedChars[selectedTeam].filter((char) => {
        return char.char_id === char_id;
      }).length === 1;
    const foundOther: boolean =
      selectedChars[otherTeam].filter((char) => {
        return char.char_id === char_id;
      }).length === 1;

    // Sets up new index
    let index: number;

    // Do not continue if character is empty
    // Or is banned or locked
    // Or is in the other team
    if (char_id === -1 || newChar.state !== State.Default || foundOther) {
      return;
    } else if (!foundSelected) {
      // If not in selected team, find empty slot
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === -1;
      });

      // Add the new character if there are empty spots
      if (index !== -1) {
        newSelected[selectedTeam][index] = { ...newChar, teamPosition: index };
      }
    } else {
      // If in selected team, find spot
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === char_id;
      });

      // Replace character with default character
      newSelected[selectedTeam][index] = defaultChar;
    }

    // Toggles the character's position in the team
    props.togglePosition(index, char_id);

    // Sets the selected characters to the new Character[][]
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
          setLockedChars={setLockedChars}
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
